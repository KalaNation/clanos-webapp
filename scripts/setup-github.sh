#!/usr/bin/env bash
# Applies the repository settings and the dev/main rulesets from AGENTS.md section 8.
# Needs `gh` logged in as a repository admin. Safe to re-run: existing rulesets are updated.
# Usage: scripts/setup-github.sh [--dry-run]     (REPO=owner/name to target another repository)
set -euo pipefail

REPO="${REPO:-KalaNation/clanos-webapp}"
DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

# Required checks must come from GitHub Actions, so another app can't fake a passing status.
GITHUB_ACTIONS_APP_ID=15368
DEV_CHECKS=(validate pr-title branch-name codeql dependency-review gitleaks)
MAIN_CHECKS=(validate pr-title branch-name codeql dependency-review gitleaks)

status_checks() {
  local first=true
  printf '['
  for check in "$@"; do
    $first || printf ','
    first=false
    printf '{"context":"%s","integration_id":%d}' "$check" "$GITHUB_ACTIONS_APP_ID"
  done
  printf ']'
}

# ruleset <name> <branch> <merge method> <linear history: true|false> <checks...>
ruleset() {
  local name=$1 branch=$2 merge_method=$3 linear=$4
  shift 4
  local linear_rule=''
  $linear && linear_rule='{ "type": "required_linear_history" },'
  cat <<JSON
{
  "name": "$name",
  "target": "branch",
  "enforcement": "active",
  "bypass_actors": [],
  "conditions": { "ref_name": { "include": ["refs/heads/$branch"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    $linear_rule
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 1,
        "require_code_owner_review": true,
        "dismiss_stale_reviews_on_push": true,
        "require_last_push_approval": false,
        "required_review_thread_resolution": true,
        "allowed_merge_methods": ["$merge_method"]
      }
    },
    {
      "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": false,
        "required_status_checks": $(status_checks "$@")
      }
    }
  ]
}
JSON
}

# Feature PRs are squash-merged into dev; release PRs merge dev into main with a merge commit,
# so main never gets commits that dev doesn't have.
DEV_RULESET=$(ruleset dev dev squash true "${DEV_CHECKS[@]}")
MAIN_RULESET=$(ruleset main main merge false "${MAIN_CHECKS[@]}")

REPO_SETTINGS=(
  -f default_branch=dev
  -F allow_squash_merge=true
  -F allow_merge_commit=true
  -F allow_rebase_merge=false
  -F allow_auto_merge=false
  -F delete_branch_on_merge=true
  -f squash_merge_commit_title=PR_TITLE
  -f squash_merge_commit_message=PR_BODY
  -f merge_commit_title=PR_TITLE
  -f merge_commit_message=PR_BODY
)

if $DRY_RUN; then
  echo "Repository $REPO settings:"
  for ((i = 1; i < ${#REPO_SETTINGS[@]}; i += 2)); do echo "  ${REPO_SETTINGS[i]}"; done
  echo
  echo "Ruleset for dev:"
  echo "$DEV_RULESET"
  echo
  echo "Ruleset for main:"
  echo "$MAIN_RULESET"
  exit 0
fi

if [[ "$(gh api "repos/$REPO" --jq .permissions.admin)" != "true" ]]; then
  echo "✖ $(gh api user --jq .login) isn't an admin of $REPO. Run this as the repository owner." >&2
  exit 1
fi

apply_ruleset() {
  local name=$1 body=$2 id
  id=$(gh api "repos/$REPO/rulesets" --jq ".[] | select(.name == \"$name\") | .id")
  if [[ -n "$id" ]]; then
    gh api -X PUT "repos/$REPO/rulesets/$id" --input - <<<"$body" >/dev/null
    echo "✓ Updated ruleset \"$name\""
  else
    gh api -X POST "repos/$REPO/rulesets" --input - <<<"$body" >/dev/null
    echo "✓ Created ruleset \"$name\""
  fi
}

gh api -X PATCH "repos/$REPO" "${REPO_SETTINGS[@]}" >/dev/null
echo "✓ Default branch dev; squash and merge commits only; branches deleted after merge"
apply_ruleset dev "$DEV_RULESET"
apply_ruleset main "$MAIN_RULESET"

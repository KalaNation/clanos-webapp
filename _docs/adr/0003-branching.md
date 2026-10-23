# 0003 · Branching: dev and main

- **Status:** Accepted; the no-bypass rule is amended by [0005](0005-admin-bypass.md)
- **Date:** 2026-10-23

## Context

Several people work on CLANOS at once. Work needs one place to come together and be tested before it reaches production, every change needs a review, and history should stay readable: one commit per change, not one per "fix typo" push.

## Decision

- **`dev` is the integration branch and the default branch.** Every feature, fix and chore branch starts from `dev` and comes back through a pull request into `dev`, merged with **squash**: the PR title, a Conventional Commit, becomes the single commit. `dev` keeps a linear history.
- **`main` is what ships.** It receives only release pull requests from `dev`, merged with a **merge commit**. Squashing or rebasing would give `main` commits that `dev` doesn't have, and the next release would conflict.
- **Nobody pushes to `dev` or `main` directly**, admins included. The pre-push hook stops it locally; the repository rulesets enforce it on GitHub.
- **Every pull request** needs one approval from a code owner, resolved conversations and passing checks (`validate`, `pr-title`, `branch-name`, `codeql`, `dependency-review`, `gitleaks`). A new push dismisses earlier approvals. Authors can't approve their own pull requests.
- **Branch names** are `<type>/<short-description>`, with the same types as Conventional Commits. Only `dev` may open a pull request into `main`.

`scripts/setup-github.sh` applies the repository settings and the two rulesets and can be re-run at any time.

## Consequences

- `dev` and `main` histories are readable: one commit per change on `dev`, one merge per release on `main`.
- A release is a reviewable pull request whose diff is exactly what ships.
- Small pull requests are cheap and large ones are painful, which nudges everyone towards small ones.
- With no bypass, an urgent production fix also goes through `dev` and a release pull request. If that becomes a problem, add a `hotfix/*` flow in a new ADR rather than a bypass.
- Code owners need at least two people, or nobody can approve the other's work.

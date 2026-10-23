#!/usr/bin/env node
// Branch rules from AGENTS.md section 8. Pre-push: --push <remote ref> <local sha>.
// CI: --pr <head branch> <base branch>. Exits 1 with the rule that was broken.
const TYPES = [
  'feat',
  'fix',
  'chore',
  'docs',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'style',
  'revert',
];
const BRANCH_NAME = new RegExp(`^(${TYPES.join('|')})/[a-z0-9]+(-[a-z0-9]+)*$`);
const BOT_BRANCH = /^dependabot\//;
const PROTECTED = new Set(['main', 'dev']);
const DELETED_SHA = /^0+$/;
const EXAMPLE = 'feat/clan-directory, fix/123-invite-expiry, chore/update-deps';

function nameProblem(branch) {
  if (BRANCH_NAME.test(branch) || BOT_BRANCH.test(branch)) return null;
  return `"${branch}" isn't <type>/<short-description>, e.g. ${EXAMPLE}. Types: ${TYPES.join(', ')}.`;
}

function pushProblem(remoteRef, localSha) {
  if (!remoteRef.startsWith('refs/heads/')) return null;
  const branch = remoteRef.slice('refs/heads/'.length);
  if (PROTECTED.has(branch)) {
    return `Pushing to ${branch} is blocked. Push a branch and open a pull request into dev.`;
  }
  return DELETED_SHA.test(localSha) ? null : nameProblem(branch);
}

function pullRequestProblem(head, base) {
  if (base === 'main') {
    return head === 'dev' ? null : `Only dev can be merged into main; open "${head}" against dev.`;
  }
  return nameProblem(head);
}

const [mode, first = '', second = ''] = process.argv.slice(2);
const problem =
  mode === '--push'
    ? pushProblem(first, second)
    : mode === '--pr'
      ? pullRequestProblem(first, second)
      : 'usage: check-branch-name.mjs --push <remote ref> <sha> | --pr <head> <base>';

if (problem) {
  console.error(`✖ ${problem}`);
  process.exit(1);
}

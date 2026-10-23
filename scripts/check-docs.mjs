#!/usr/bin/env node
// Fails a pull request whose architecture changes have no docs, or whose changed components have
// no story change (AGENTS.md section 9). usage: check-docs.mjs --base <git ref>; PR_BODY in env.
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const DOCS = [/^_docs\//, /^(AGENTS|README|CONTRIBUTING|SECURITY|CLAUDE)\.md$/];
const ARCHITECTURE = [
  /^src\/(proxy|instrumentation|env|env\.server)\.ts$/,
  /^src\/lib\/security\//,
  /^src\/app\/(.+\/)?layout\.tsx$/,
  /^src\/app\/(globals\.css|error\.tsx|global-error\.tsx|not-found\.tsx)$/,
  /^src\/styles\//,
  /^\.env\.example$/,
  /^(next\.config\.ts|tsconfig\.json|components\.json|pnpm-workspace\.yaml)$/,
  /^(eslint|prettier|lint-staged|commitlint)\.config\.mjs$/,
  /^(vitest\.config\.mts|playwright\.config\.ts)$/,
  /^\.storybook\//,
  /^\.husky\//,
  /^\.github\/(workflows\/|CODEOWNERS|dependabot\.yml)/,
  /^scripts\/(?!.*\.test\.ts$)/,
];
// Adding or removing a module here changes the app's structure; editing one doesn't.
const NEW_STRUCTURE = [/^src\/lib\//, /^src\/[^/]+$/, /^src\/[^/]+\/$/];
const COMPONENT = /^src\/(components\/.+|features\/[^/]+\/components\/.+)\.tsx$/;
const COMPANION = /\.(stories|test)\.tsx$/;
const WAIVER = (name) => new RegExp(`^\\s*${name}:\\s*not needed\\s*[-—–:]\\s*[^<\\s].{5,}`, 'im');
const PACKAGE_FIELDS = ['dependencies', 'devDependencies', 'scripts', 'engines', 'devEngines'];

/** What changed in package.json that affects the architecture: packages, scripts or runtimes. */
export function packageChanges(base, head) {
  const changes = [];
  for (const field of PACKAGE_FIELDS) {
    const before = base?.[field] ?? {};
    const after = head?.[field] ?? {};
    const isVersionField = field.endsWith('ependencies');
    for (const key of new Set([...Object.keys(before), ...Object.keys(after)])) {
      const added = !(key in before);
      const removed = !(key in after);
      if (
        added ||
        removed ||
        (!isVersionField && JSON.stringify(before[key]) !== JSON.stringify(after[key]))
      ) {
        changes.push(`package.json ${field}: ${added ? '+' : removed ? '-' : '~'}${key}`);
      }
    }
  }
  return changes;
}

/**
 * Returns the problems with a pull request. `changes` are `git diff --name-status` entries;
 * `basePackage` and `headPackage` are the parsed package.json files.
 */
export function findDocProblems({ changes, basePackage, headPackage, prBody = '' }) {
  const problems = [];
  const paths = new Set(changes.map((change) => change.path));
  const docsChanged = [...paths].some((path) => DOCS.some((re) => re.test(path)));

  const architecture = [
    ...changes
      .filter(
        ({ path, status }) =>
          ARCHITECTURE.some((re) => re.test(path)) ||
          ((status === 'A' || status === 'D') &&
            NEW_STRUCTURE.some((re) => re.test(path)) &&
            !COMPANION.test(path) &&
            !path.endsWith('.test.ts')),
      )
      .map(({ path }) => path),
    ...packageChanges(basePackage, headPackage),
  ];
  if (architecture.length && !docsChanged && !WAIVER('Docs').test(prBody)) {
    problems.push(
      `Architecture changed but no docs did:\n${architecture.map((a) => `  - ${a}`).join('\n')}\n` +
        '  Update _docs/ (add an ADR for a decision) and AGENTS.md, README, CONTRIBUTING or SECURITY\n' +
        '  where they describe this. If nothing needs documenting, add a line to the PR description:\n' +
        '  "Docs: not needed — <why>".',
    );
  }

  const staleStories = changes
    .filter(({ path, status }) => status !== 'D' && COMPONENT.test(path) && !COMPANION.test(path))
    .map(({ path }) => path.replace(/\.tsx$/, '.stories.tsx'))
    .filter((story) => !paths.has(story));
  if (staleStories.length && !WAIVER('Stories').test(prBody)) {
    problems.push(
      `Components changed but their stories didn't:\n${staleStories.map((s) => `  - ${s}`).join('\n')}\n` +
        '  Update the stories so Storybook shows every variant and state. If the change has no\n' +
        '  visible effect, add a line to the PR description: "Stories: not needed — <why>".',
    );
  }
  return problems;
}

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
}

function readPackage(ref) {
  try {
    return JSON.parse(ref ? git('show', `${ref}:package.json`) : git('show', 'HEAD:package.json'));
  } catch {
    return {};
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const baseIndex = process.argv.indexOf('--base');
  const base = baseIndex > 0 ? process.argv[baseIndex + 1] : 'origin/dev';
  const mergeBase = git('merge-base', base, 'HEAD').trim();
  const changes = git('diff', '--name-status', '--no-renames', mergeBase, 'HEAD')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [status = '', path = ''] = line.split('\t');
      return { status: status.charAt(0), path };
    });
  const problems = findDocProblems({
    changes,
    basePackage: readPackage(mergeBase),
    headPackage: readPackage(),
    prBody: process.env.PR_BODY ?? '',
  });
  if (problems.length) {
    console.error(`✖ ${problems.join('\n\n✖ ')}`);
    process.exit(1);
  }
  console.log('check:docs: docs and stories keep up with this change.');
}

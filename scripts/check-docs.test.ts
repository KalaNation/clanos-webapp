import { describe, expect, it } from 'vitest';

import { findDocProblems, packageChanges } from './check-docs.mjs';

const PKG = { dependencies: { next: '16.4.3' }, devDependencies: { vitest: '5.0.5' }, scripts: {} };
const modified = (...paths: string[]) => paths.map((path) => ({ status: 'M', path }));
const added = (...paths: string[]) => paths.map((path) => ({ status: 'A', path }));

function problems(changes: { status: string; path: string }[], prBody = '', headPackage = PKG) {
  return findDocProblems({ changes, basePackage: PKG, headPackage, prBody });
}

describe('check-docs: architecture', () => {
  it('fails when the proxy changes and no docs do', () => {
    const result = problems(modified('src/proxy.ts'));
    expect(result).toHaveLength(1);
    expect(result[0]).toContain('src/proxy.ts');
  });

  it('passes when the same pull request updates the docs', () => {
    expect(problems(modified('src/proxy.ts', 'SECURITY.md'))).toEqual([]);
    expect(problems(modified('eslint.config.mjs', '_docs/architecture/overview.md'))).toEqual([]);
  });

  it('treats a new dependency as architecture, but not a version bump', () => {
    const withAxios = { ...PKG, dependencies: { ...PKG.dependencies, axios: '1.20.0' } };
    expect(problems(modified('package.json'), '', withAxios)[0]).toContain('+axios');

    const bumped = { ...PKG, dependencies: { next: '16.5.0' } };
    expect(problems(modified('package.json'), '', bumped)).toEqual([]);
  });

  it('treats a new module in src/lib as architecture, but not an edit to one', () => {
    expect(problems(added('src/lib/api/client.ts'))).toHaveLength(1);
    expect(problems(modified('src/lib/utils.ts'))).toEqual([]);
  });

  it('ignores product code and tests', () => {
    expect(
      problems(modified('src/app/(app)/clans/page.tsx', 'scripts/check-docs.test.ts')),
    ).toEqual([]);
  });

  it('accepts an explicit, reasoned waiver in the PR description', () => {
    const body = 'Docs: not needed — only reorders imports in the proxy';
    expect(problems(modified('src/proxy.ts'), body)).toEqual([]);
    expect(problems(modified('src/proxy.ts'), 'Docs: not needed — <reason>')).toHaveLength(1);
    expect(problems(modified('src/proxy.ts'), 'Docs: not needed')).toHaveLength(1);
  });
});

describe('check-docs: stories', () => {
  it('fails when a component changes and its story does not', () => {
    const result = problems(modified('src/components/ui/button.tsx'));
    expect(result[0]).toContain('src/components/ui/button.stories.tsx');
  });

  it('passes when the story changes too, also for feature components', () => {
    expect(
      problems(
        modified(
          'src/features/clans/components/clan-card.tsx',
          'src/features/clans/components/clan-card.stories.tsx',
        ),
      ),
    ).toEqual([]);
  });

  it('accepts a reasoned waiver for changes with no visible effect', () => {
    const body = 'Stories: not needed — renames an internal variable';
    expect(problems(modified('src/components/ui/button.tsx'), body)).toEqual([]);
  });
});

describe('packageChanges', () => {
  it('reports added, removed and changed scripts', () => {
    expect(
      packageChanges({ scripts: { a: 'x', b: 'y' } }, { scripts: { a: 'z', c: 'w' } }),
    ).toEqual(['package.json scripts: ~a', 'package.json scripts: -b', 'package.json scripts: +c']);
  });
});

import { describe, expect, it } from 'vitest';

import { runCheckInProject } from './test-utils';

const COMPONENT = 'export const A = () => null;\n';
const check = (tree: Record<string, string>, args?: string[]) =>
  runCheckInProject('check-stories.mjs', tree, args);

describe('check-stories', () => {
  it('passes when a component has a story and a test', () => {
    const result = check({
      'src/components/ui/button.tsx': COMPONENT,
      'src/components/ui/button.stories.tsx': COMPONENT,
      'src/components/ui/button.test.tsx': COMPONENT,
    });
    expect(result.passed).toBe(true);
  });

  it('reports a missing story and a missing test', () => {
    const result = check({ 'src/features/clans/components/clan-card.tsx': COMPONENT });
    expect(result.passed).toBe(false);
    expect(result.output).toContain('missing clan-card.stories.tsx');
    expect(result.output).toContain('missing clan-card.test.tsx');
  });

  it('ignores files outside the component folders', () => {
    const result = check({
      'src/app/page.tsx': COMPONENT,
      'src/features/clans/api/use-clans.tsx': COMPONENT,
    });
    expect(result.passed).toBe(true);
  });

  it('checks only the files it is given, as lint-staged passes them', () => {
    const tree = {
      'src/components/ui/a.tsx': COMPONENT,
      'src/components/ui/b.tsx': COMPONENT,
      'src/components/ui/b.stories.tsx': COMPONENT,
      'src/components/ui/b.test.tsx': COMPONENT,
    };
    expect(check(tree, ['src/components/ui/b.tsx']).passed).toBe(true);
    expect(check(tree, ['src/components/ui/a.tsx']).passed).toBe(false);
  });
});

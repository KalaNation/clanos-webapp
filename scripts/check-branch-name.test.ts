import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

function check(...args: string[]) {
  const result = spawnSync(
    process.execPath,
    [join(import.meta.dirname, 'check-branch-name.mjs'), ...args],
    { encoding: 'utf8' },
  );
  return { passed: result.status === 0, output: result.stderr };
}

const SHA = 'a'.repeat(40);
const DELETED = '0'.repeat(40);

describe('check-branch-name --push', () => {
  it.each(['feat/clan-directory', 'fix/123-invite-expiry', 'chore/update-deps'])(
    'accepts %s',
    (branch) => {
      expect(check('--push', `refs/heads/${branch}`, SHA).passed).toBe(true);
    },
  );

  it.each(['main', 'dev'])('blocks pushes to %s', (branch) => {
    const result = check('--push', `refs/heads/${branch}`, SHA);
    expect(result.passed).toBe(false);
    expect(result.output).toContain('open a pull request into dev');
  });

  it.each(['clan-directory', 'feature/x', 'feat/Clan_Directory', 'feat/', 'feat/trailing-'])(
    'rejects %s',
    (branch) => {
      expect(check('--push', `refs/heads/${branch}`, SHA).passed).toBe(false);
    },
  );

  it('allows deleting a branch and pushing tags', () => {
    expect(check('--push', 'refs/heads/old-name', DELETED).passed).toBe(true);
    expect(check('--push', 'refs/tags/v1.0.0', SHA).passed).toBe(true);
  });
});

describe('check-branch-name --pr', () => {
  it('accepts feature branches into dev, including Dependabot’s', () => {
    expect(check('--pr', 'feat/clan-directory', 'dev').passed).toBe(true);
    expect(check('--pr', 'dependabot/npm_and_yarn/next-16.5.0', 'dev').passed).toBe(true);
  });

  it('only lets dev into main', () => {
    expect(check('--pr', 'dev', 'main').passed).toBe(true);
    const result = check('--pr', 'feat/clan-directory', 'main');
    expect(result.passed).toBe(false);
    expect(result.output).toContain('Only dev can be merged into main');
  });
});

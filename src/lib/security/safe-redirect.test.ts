import { describe, expect, it } from 'vitest';

import { safeNextPath } from './safe-redirect';

describe('safeNextPath', () => {
  it('keeps a path on this site, with its query', () => {
    expect(safeNextPath('/clans/rvnt/members?tab=invitations')).toBe(
      '/clans/rvnt/members?tab=invitations',
    );
  });

  it.each([
    ['another site', 'https://evil.example/phish'],
    ['a protocol-relative URL', '//evil.example'],
    ['a backslash trick', '/\\evil.example'],
    ['a script URL', 'javascript:alert(1)'],
    ['nothing', null],
  ])('falls back to the dashboard for %s', (_, next) => {
    expect(safeNextPath(next)).toBe('/dashboard');
  });
});

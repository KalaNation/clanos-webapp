import { describe, expect, it } from 'vitest';

import { isAppRoute, ROUTES } from './routes';

describe('isAppRoute', () => {
  it.each([
    '/dashboard',
    '/clans',
    '/clans/rvnt/members',
    '/onboarding/game',
    '/admin/users',
    '/me',
  ])('treats %s as signed-in only', (path) => {
    expect(isAppRoute(path)).toBe(true);
  });

  it.each([
    '/sign-in',
    '/forgot-password/sent',
    '/invitations/abc',
    '/',
    '/clansfake',
    '/reset-password/done',
  ])('leaves %s public', (path) => {
    expect(isAppRoute(path)).toBe(false);
  });
});

describe('ROUTES', () => {
  it('encodes dynamic segments', () => {
    expect(ROUTES.clanMembers('a/b')).toBe('/clans/a%2Fb/members');
    expect(ROUTES.invitation('t 1')).toBe('/invitations/t%201');
  });
});

// @vitest-environment node
import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

import { proxy } from './proxy';

const SESSION_COOKIE = 'clanos_session';

function visit(path: string, { signedIn = false } = {}) {
  const request = new NextRequest(new URL(path, 'https://app.clanos.test'));
  if (signedIn) request.cookies.set(SESSION_COOKIE, 'session-from-the-api');
  return proxy(request);
}

describe('proxy', () => {
  it('sends signed-out visitors from app routes to sign-in, remembering where they were', () => {
    const response = visit('/clans/rvnt/members?tab=invitations');

    expect(response.status).toBe(307);
    const location = new URL(response.headers.get('location') ?? '');
    expect(location.pathname).toBe('/sign-in');
    expect(location.searchParams.get('next')).toBe('/clans/rvnt/members?tab=invitations');
  });

  it('lets a visitor with a session cookie through', () => {
    const response = visit('/dashboard', { signedIn: true });

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });

  it('leaves public routes open', () => {
    expect(visit('/sign-in').status).toBe(200);
    expect(visit('/invitations/abc123').status).toBe(200);
  });

  it('sets a nonce-based CSP and passes the same nonce to the app', () => {
    const response = visit('/sign-in');

    const csp = response.headers.get('content-security-policy') ?? '';
    const nonce = /'nonce-([^']+)'/.exec(csp)?.[1];
    expect(nonce).toBeTruthy();
    expect(response.headers.get('x-middleware-request-x-nonce')).toBe(nonce);
    expect(csp).toContain("frame-ancestors 'none'");
  });

  it('uses a new nonce for every request', () => {
    const first = visit('/sign-in').headers.get('content-security-policy');
    const second = visit('/sign-in').headers.get('content-security-policy');

    expect(first).not.toBe(second);
  });

  it('sets the security headers on redirects too', () => {
    const response = visit('/dashboard');

    expect(response.headers.get('x-content-type-options')).toBe('nosniff');
    expect(response.headers.get('content-security-policy')).toBeTruthy();
  });
});

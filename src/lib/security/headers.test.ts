import { describe, expect, it } from 'vitest';

import { buildContentSecurityPolicy, securityHeaders } from './headers';

const directives = (csp: string) =>
  Object.fromEntries(
    csp.split('; ').map((directive) => {
      const [name = '', ...sources] = directive.split(' ');
      return [name, sources];
    }),
  );

describe('buildContentSecurityPolicy', () => {
  const production = directives(
    buildContentSecurityPolicy({
      nonce: 'abc123',
      apiOrigin: 'https://api.clanos.gg',
      isDevelopment: false,
    }),
  );

  it('only runs scripts carrying this request’s nonce', () => {
    expect(production['script-src']).toEqual(["'self'", "'nonce-abc123'", "'strict-dynamic'"]);
  });

  it('blocks framing, plugins and foreign form targets', () => {
    expect(production['frame-ancestors']).toEqual(["'none'"]);
    expect(production['object-src']).toEqual(["'none'"]);
    expect(production['form-action']).toEqual(["'self'"]);
  });

  it('lets the browser call only this app and the API', () => {
    expect(production['connect-src']).toEqual(["'self'", 'https://api.clanos.gg']);
  });

  it('allows only this app when the API URL isn’t set', () => {
    const csp = directives(buildContentSecurityPolicy({ nonce: 'n', isDevelopment: false }));
    expect(csp['connect-src']).toEqual(["'self'"]);
  });

  it('adds eval only in development, where React needs it for debug stacks', () => {
    const development = directives(
      buildContentSecurityPolicy({
        nonce: 'abc123',
        apiOrigin: 'http://localhost:4000',
        isDevelopment: true,
      }),
    );
    expect(development['script-src']).toContain("'unsafe-eval'");
    expect(production['script-src']).not.toContain("'unsafe-eval'");
    expect(development).not.toHaveProperty('upgrade-insecure-requests');
  });
});

describe('securityHeaders', () => {
  it('sends HSTS only in production, where the app is served over HTTPS', () => {
    expect(securityHeaders({ isProduction: true })).toHaveProperty('Strict-Transport-Security');
    expect(securityHeaders({ isProduction: false })).not.toHaveProperty(
      'Strict-Transport-Security',
    );
  });

  it('always forbids MIME sniffing and framing', () => {
    expect(securityHeaders({ isProduction: false })).toMatchObject({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
    });
  });
});

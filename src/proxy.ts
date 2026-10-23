import { type NextRequest, NextResponse } from 'next/server';

import { isAppRoute, ROUTES } from '@/lib/routes';
import { buildContentSecurityPolicy, NONCE_HEADER, securityHeaders } from '@/lib/security/headers';

const CSP_HEADER = 'Content-Security-Policy';
const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME ?? 'clanos_session';

/** The API's origin for the CSP, or undefined if NEXT_PUBLIC_API_URL is missing or invalid. */
function apiOrigin(): string | undefined {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL ?? '').origin;
  } catch {
    return undefined;
  }
}

/**
 * Runs before every page. Sends signed-out visitors from app routes to sign-in and sets the
 * security headers, with a fresh CSP nonce that the root layout reads from NONCE_HEADER.
 */
export function proxy(request: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const nonce = btoa(crypto.randomUUID());
  const csp = buildContentSecurityPolicy({ nonce, apiOrigin: apiOrigin(), isDevelopment });

  const { pathname, search } = request.nextUrl;
  let response: NextResponse;
  // Only checks that a session cookie exists; the API decides whether it is valid.
  if (isAppRoute(pathname) && !request.cookies.has(SESSION_COOKIE)) {
    const signIn = new URL(ROUTES.signIn, request.url);
    signIn.searchParams.set('next', `${pathname}${search}`);
    response = NextResponse.redirect(signIn);
  } else {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(NONCE_HEADER, nonce);
    requestHeaders.set(CSP_HEADER, csp);
    response = NextResponse.next({ request: { headers: requestHeaders } });
  }

  response.headers.set(CSP_HEADER, csp);
  for (const [name, value] of Object.entries(securityHeaders({ isProduction: !isDevelopment }))) {
    response.headers.set(name, value);
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};

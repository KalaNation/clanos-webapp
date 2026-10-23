/** The proxy passes each request's CSP nonce to the app in this header. */
export const NONCE_HEADER = 'x-nonce';

const HSTS_TWO_YEARS = 'max-age=63072000; includeSubDomains; preload';

interface CspOptions {
  nonce: string;
  /** Origin of the backend API the browser calls; omitted from connect-src when unknown. */
  apiOrigin?: string;
  isDevelopment: boolean;
}

/**
 * Builds the Content-Security-Policy. Scripts need this request's nonce. Styles allow inline
 * because Base UI positions popups with style attributes and sonner injects a <style> tag;
 * see SECURITY.md. Dev adds 'unsafe-eval', which React uses for debug stacks.
 */
export function buildContentSecurityPolicy({ nonce, apiOrigin, isDevelopment }: CspOptions) {
  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      ...(isDevelopment ? ["'unsafe-eval'"] : []),
    ],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'blob:', 'data:'],
    'font-src': ["'self'"],
    'connect-src': ["'self'", ...(apiOrigin ? [apiOrigin] : [])],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    ...(isDevelopment ? {} : { 'upgrade-insecure-requests': [] }),
  };
  return Object.entries(directives)
    .map(([directive, sources]) => [directive, ...sources].join(' '))
    .join('; ');
}

/** Headers for every response, static files included (next.config applies them too). */
export function securityHeaders({
  isProduction,
}: {
  isProduction: boolean;
}): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
    ...(isProduction ? { 'Strict-Transport-Security': HSTS_TWO_YEARS } : {}),
  };
}

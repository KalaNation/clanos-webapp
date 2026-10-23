const FALLBACK_PATH = '/dashboard';

/**
 * Returns `next` only if it is a path on this site, so `/sign-in?next=` can't send people to
 * another site after they sign in (open redirect). Anything else becomes the dashboard.
 */
export function safeNextPath(next: string | null | undefined): string {
  if (!next?.startsWith('/') || next.startsWith('//') || next.includes('\\')) return FALLBACK_PATH;
  try {
    const url = new URL(next, 'https://clanos.invalid');
    return url.origin === 'https://clanos.invalid' ? `${url.pathname}${url.search}` : FALLBACK_PATH;
  } catch {
    return FALLBACK_PATH;
  }
}

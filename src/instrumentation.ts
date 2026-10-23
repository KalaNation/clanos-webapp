/** Runs once when a Next server starts: it refuses to start if an environment variable is wrong. */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  await import('./env');
  await import('./env.server');
}

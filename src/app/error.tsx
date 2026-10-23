'use client';

import { useEffect } from 'react';

import { ErrorState } from '@/components/layout/error-state';

/** Catches errors in any page below the root layout. */
export default function RouteError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // Server errors arrive with only a digest, which matches the server log entry.
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-gutter py-gutter">
      <ErrorState onRetry={retry} />
    </main>
  );
}

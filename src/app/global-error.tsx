'use client';

import './globals.css';

import { ErrorState } from '@/components/layout/error-state';
import { fontVariables } from '@/lib/fonts';
import { cn } from '@/lib/utils';

/** Replaces the root layout when it fails, so it brings its own html, styles and fonts. */
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en" className={cn(fontVariables)}>
      <body>
        <title>Something went wrong · CLANOS</title>
        <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-gutter py-gutter">
          <ErrorState onRetry={retry} />
        </main>
      </body>
    </html>
  );
}

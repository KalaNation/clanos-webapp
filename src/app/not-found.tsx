import type { Metadata } from 'next';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-sp-16 px-gutter py-gutter">
      <p className="t-label text-mut">404</p>
      <h1 className="t-h1">This page doesn’t exist</h1>
      <p className="t-body text-tx-2">
        The link may be old, or the clan or invitation may have been removed.
      </p>
      <Link href={ROUTES.dashboard} className={buttonVariants({ size: 'lg' })}>
        Go to your dashboard
      </Link>
    </main>
  );
}

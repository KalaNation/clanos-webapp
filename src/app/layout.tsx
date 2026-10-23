import './globals.css';

import type { Metadata } from 'next';
import { headers } from 'next/headers';

import { Toaster } from '@/components/ui/sonner';
import { AppProviders } from '@/lib/app-providers';
import { fontVariables } from '@/lib/fonts';
import { NONCE_HEADER } from '@/lib/security/headers';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: { default: 'CLANOS', template: '%s · CLANOS' },
  description: 'Run your gaming clan: members, recruitment, teams and announcements.',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  // Reading the nonce renders every page per request, which a nonce-based CSP requires.
  const nonce = (await headers()).get(NONCE_HEADER) ?? undefined;

  return (
    <html lang="en" className={cn(fontVariables)}>
      <body>
        <AppProviders nonce={nonce}>{children}</AppProviders>
        <Toaster />
      </body>
    </html>
  );
}

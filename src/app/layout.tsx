import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CLANOS',
  description: 'Run your gaming clan: members, recruitment, teams and announcements.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

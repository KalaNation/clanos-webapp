import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ComponentsShowcase } from '@/components/dev/components-showcase';

export const metadata: Metadata = { title: 'Components · CLANOS', robots: { index: false } };

// Design-system reference for D45/M45. Dev only: production builds answer 404.
export default function DevComponentsPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  return <ComponentsShowcase />;
}

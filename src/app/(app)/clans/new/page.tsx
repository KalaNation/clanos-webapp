// D22/M22 · Create a clan
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Create a clan' };

export default function ClansNewPage() {
  return <ScreenPlaceholder title="Create a clan" screens={['D22', 'M22']} />;
}

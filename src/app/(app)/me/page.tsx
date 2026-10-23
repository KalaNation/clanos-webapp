// D25/M25 · Profile & game IDs
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Profile & game IDs' };

export default function MePage() {
  return <ScreenPlaceholder title="Profile & game IDs" screens={['D25', 'M25']} />;
}

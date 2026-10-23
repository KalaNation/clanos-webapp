// D18/M18 · Clan directory · M19 · Filters sheet
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Clan directory' };

export default function ClansPage() {
  return <ScreenPlaceholder title="Clan directory" screens={['D18', 'M18', 'M19']} />;
}

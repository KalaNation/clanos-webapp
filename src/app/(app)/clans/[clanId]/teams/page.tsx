// D39/M39 · Teams
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Teams' };

export default function ClansClanIdTeamsPage() {
  return <ScreenPlaceholder title="Teams" screens={['D39', 'M39']} />;
}

// D36/M36 · Staff & roles
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Staff & roles' };

export default function ClansClanIdStaffPage() {
  return <ScreenPlaceholder title="Staff & roles" screens={['D36', 'M36']} />;
}

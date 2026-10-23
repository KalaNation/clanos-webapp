// D23/M23 · Home / Player dashboard
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return <ScreenPlaceholder title="Dashboard" screens={['D23', 'M23']} />;
}

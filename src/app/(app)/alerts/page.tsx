// M24 · Alerts (mobile only)
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Alerts' };

export default function AlertsPage() {
  return <ScreenPlaceholder title="Alerts" screens={['M24']} />;
}

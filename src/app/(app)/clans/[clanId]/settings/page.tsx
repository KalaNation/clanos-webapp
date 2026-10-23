// D41/M41 · Clan settings · D42/M42 · Delete clan
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Clan settings' };

export default function ClansClanIdSettingsPage() {
  return <ScreenPlaceholder title="Clan settings" screens={['D41', 'M41', 'D42', 'M42']} />;
}

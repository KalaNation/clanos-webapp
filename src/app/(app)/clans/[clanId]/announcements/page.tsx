// D37/M37 · Announcements feed · D38/M38 · Composer
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Announcements' };

export default function ClansClanIdAnnouncementsPage() {
  return <ScreenPlaceholder title="Announcements" screens={['D37', 'M37', 'D38', 'M38']} />;
}

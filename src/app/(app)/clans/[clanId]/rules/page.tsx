// D40/M40 · Rules
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Rules' };

export default function ClansClanIdRulesPage() {
  return <ScreenPlaceholder title="Rules" screens={['D40', 'M40']} />;
}

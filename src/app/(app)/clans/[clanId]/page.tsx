// Non-members: D20/M20 · Clan profile, D21/M21 · Apply. Members: D26/M26 · Clan dashboard
// (Clan Master), D27 · Staff, D28/M28 · Member.
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Clan' };

export default function ClansClanIdPage() {
  return (
    <ScreenPlaceholder
      title="Clan"
      screens={['D20', 'M20', 'D21', 'M21', 'D26', 'M26', 'D27', 'D28', 'M28']}
    />
  );
}

// D29/M29 · Members, D30/M30 · Member view, M31 · Actions sheet, D32/M32 · Invitations
// (?tab=invitations), D33/M33 · Invite dialog / sheet
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Members' };

export default function ClansClanIdMembersPage() {
  return (
    <ScreenPlaceholder
      title="Members"
      screens={['D29', 'M29', 'D30', 'M30', 'M31', 'D32', 'M32', 'D33', 'M33']}
    />
  );
}

// D12–D17/M12–M17 · Invitation: new user, existing user, accepted, declined, expired,
// wrong account
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Invitation' };

export default function InvitationsTokenPage() {
  return (
    <ScreenPlaceholder
      title="Invitation"
      screens={['D12', 'M12', 'D13', 'M13', 'D14', 'M14', 'D15', 'M15', 'D16', 'M16', 'D17', 'M17']}
    />
  );
}

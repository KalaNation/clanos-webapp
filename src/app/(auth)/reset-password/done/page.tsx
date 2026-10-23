// D08/M08 · Password updated
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Password updated' };

export default function ResetPasswordDonePage() {
  return <ScreenPlaceholder title="Password updated" screens={['D08', 'M08']} />;
}

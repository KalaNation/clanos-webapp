// D07/M07 · Set new password
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Set new password' };

export default function ResetPasswordTokenPage() {
  return <ScreenPlaceholder title="Set new password" screens={['D07', 'M07']} />;
}

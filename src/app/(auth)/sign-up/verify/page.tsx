// D04/M04 · Verify email
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Verify email' };

export default function SignUpVerifyPage() {
  return <ScreenPlaceholder title="Verify email" screens={['D04', 'M04']} />;
}

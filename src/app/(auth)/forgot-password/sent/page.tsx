// D06/M06 · Forgot password / Link sent
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Reset link sent' };

export default function ForgotPasswordSentPage() {
  return <ScreenPlaceholder title="Reset link sent" screens={['D06', 'M06']} />;
}

// D05/M05 · Forgot password
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Forgot password' };

export default function ForgotPasswordPage() {
  return <ScreenPlaceholder title="Forgot password" screens={['D05', 'M05']} />;
}

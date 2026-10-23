// D01/M01 · Sign in · D02/M02 · Sign in / Error
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Sign in' };

export default function SignInPage() {
  return <ScreenPlaceholder title="Sign in" screens={['D01', 'M01', 'D02', 'M02']} />;
}

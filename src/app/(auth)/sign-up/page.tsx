// D03/M03 · Create account (step 1)
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Create account' };

export default function SignUpPage() {
  return <ScreenPlaceholder title="Create account" screens={['D03', 'M03']} />;
}

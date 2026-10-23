// D10/M10 · Onboarding / 3 · Game profile
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Game profile' };

export default function OnboardingGameProfilePage() {
  return <ScreenPlaceholder title="Game profile" screens={['D10', 'M10']} />;
}

// D11/M11 · Onboarding / 4 · Find a clan
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Find a clan' };

export default function OnboardingClansPage() {
  return <ScreenPlaceholder title="Find a clan" screens={['D11', 'M11']} />;
}

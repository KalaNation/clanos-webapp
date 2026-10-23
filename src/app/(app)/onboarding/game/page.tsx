// D09/M09 · Onboarding / 2 · Choose game
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Choose your game' };

export default function OnboardingGamePage() {
  return <ScreenPlaceholder title="Choose your game" screens={['D09', 'M09']} />;
}

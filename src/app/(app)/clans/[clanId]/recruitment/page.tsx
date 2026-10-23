// D34/M34 · Recruitment queue (+ applicant on desktop)
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Recruitment' };

export default function ClansClanIdRecruitmentPage() {
  return <ScreenPlaceholder title="Recruitment" screens={['D34', 'M34']} />;
}

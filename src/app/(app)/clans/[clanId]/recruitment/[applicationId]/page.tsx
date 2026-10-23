// M35 · Recruitment / Applicant (mobile; desktop shows it beside the queue on D34)
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Applicant' };

export default function ClansClanIdRecruitmentApplicationIdPage() {
  return <ScreenPlaceholder title="Applicant" screens={['M35']} />;
}

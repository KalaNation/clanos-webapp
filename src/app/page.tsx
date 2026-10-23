import { redirect } from 'next/navigation';

import { ROUTES } from '@/lib/routes';

// There is no landing page in the design: signed-in players start on the dashboard, and the
// proxy sends everyone else to sign-in.
export default function HomePage() {
  redirect(ROUTES.dashboard);
}

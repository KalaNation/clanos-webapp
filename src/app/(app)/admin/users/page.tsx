// D44/M44 · Admin / Users
import type { Metadata } from 'next';

import { ScreenPlaceholder } from '@/components/layout/screen-placeholder';

export const metadata: Metadata = { title: 'Users' };

export default function AdminUsersPage() {
  return <ScreenPlaceholder title="Users" screens={['D44', 'M44']} />;
}

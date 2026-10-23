import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Badge, type BadgeVariant } from './badge';

const STATUS: BadgeVariant[] = [
  'active',
  'pending',
  'suspended',
  'removed',
  'accepted',
  'declined',
  'expired',
  'revoked',
  'unverified',
  'locked',
];
const ANNOUNCEMENT: BadgeVariant[] = ['draft', 'scheduled', 'published', 'pinned', 'archived'];
const RECRUITMENT: BadgeVariant[] = ['open', 'invite', 'closed'];

const meta = {
  title: 'UI/Badge',
  component: Badge,
  args: { variant: 'active' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const row = (variants: BadgeVariant[]) => (
  <div className="flex flex-wrap gap-sp-6">
    {variants.map((variant) => (
      <Badge key={variant} variant={variant} />
    ))}
  </div>
);

/** Member, invitation and account status: glyph + colour, never colour alone. */
export const Status: Story = { render: () => row(STATUS) };

export const Announcement: Story = { render: () => row(ANNOUNCEMENT) };

/** Recruitment mode on the clan profile and directory. */
export const Recruitment: Story = { render: () => row(RECRUITMENT) };

/** Short forms are used in tight mobile rows, e.g. "ACT" on M29. */
export const CustomLabel: Story = { args: { variant: 'active', children: 'Act' } };

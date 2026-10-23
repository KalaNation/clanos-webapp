import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Skeleton } from './skeleton';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** D45 "Loading — skeleton, no spinner". */
export const LoadingCard: Story = {
  render: () => (
    <div
      role="status"
      aria-label="Loading members"
      className="flex w-full max-w-sm flex-col gap-sp-12 rounded-lg border border-bd bg-bg p-card"
    >
      <Skeleton className="h-sp-10 w-3/4" />
      <Skeleton className="h-sp-10 w-full" />
      <Skeleton className="h-sp-10 w-1/2" />
      <p className="t-label text-mut">Loading — skeleton, no spinner</p>
    </div>
  ),
};

export const MemberRow: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center gap-sp-12">
      <Skeleton className="size-sp-32 rounded-full" />
      <div className="flex flex-1 flex-col gap-sp-6">
        <Skeleton className="h-sp-12 w-1/2" />
        <Skeleton className="h-sp-10 w-1/3" />
      </div>
    </div>
  ),
};

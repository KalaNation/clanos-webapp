import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Separator } from './separator';

const meta = {
  title: 'UI/Separator',
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-sp-12">
      <p className="t-body">Clan dashboard</p>
      <Separator />
      <p className="t-body">Members</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-sp-24 items-center gap-sp-12 t-data text-mut">
      <span>Clan Master</span>
      <Separator orientation="vertical" />
      <span>Mar 2026</span>
    </div>
  ),
};

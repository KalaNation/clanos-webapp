import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  args: { defaultValue: 'all' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Section tabs on Members (D29/M29). They scroll sideways on mobile. */
export const Underline: Story = {
  render: (args) => (
    <Tabs {...args} className="w-full">
      <TabsList>
        <TabsTrigger value="all">
          All <span className="t-data text-mut">48</span>
        </TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="invitations">Invitations</TabsTrigger>
        <TabsTrigger value="suspended" disabled>
          Suspended
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="px-gutter t-body">
        All 48 members.
      </TabsContent>
      <TabsContent value="pending" className="px-gutter t-body">
        6 pending applications.
      </TabsContent>
      <TabsContent value="invitations" className="px-gutter t-body">
        4 open invitations.
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('tab', { name: 'Invitations' }));
    await expect(canvas.getByText('4 open invitations.')).toBeVisible();
  },
};

/** Segmented control inside a card, e.g. a period switch. */
export const Segmented: Story = {
  args: { defaultValue: 'week' },
  render: (args) => (
    <Tabs {...args} className="w-full max-w-sm">
      <TabsList variant="segmented">
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
        <TabsTrigger value="season">Season</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

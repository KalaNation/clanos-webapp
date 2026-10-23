import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

const meta = {
  title: 'UI/Card',
  component: Card,
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Card shell: header + rows. */
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Needs your attention</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="t-body text-tx-2">3 applications are waiting for review.</p>
      </CardContent>
      <CardFooter>
        <CardDescription>Updated 2 minutes ago</CardDescription>
      </CardFooter>
    </Card>
  ),
};

/** Empty state (D45): dashed border, a message and the next step. */
export const Empty: Story = {
  render: () => (
    <Card variant="dashed">
      <CardContent className="items-center text-center">
        <CardTitle>No applications yet</CardTitle>
        <CardDescription>Open recruitment or invite players directly by email.</CardDescription>
        <div className="flex gap-sp-8">
          <Button size="sm">Invite member</Button>
          <Button size="sm" variant="secondary">
            Open recruitment
          </Button>
        </div>
      </CardContent>
    </Card>
  ),
};

export const Sunk: Story = {
  render: () => (
    <Card variant="sunk">
      <CardContent>
        <p className="t-label text-mut">Loading — skeleton, no spinner</p>
      </CardContent>
    </Card>
  ),
};

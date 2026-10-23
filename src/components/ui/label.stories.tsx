import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './input';
import { Label } from './label';

const meta = {
  title: 'UI/Label',
  component: Label,
  args: { children: 'Email', htmlFor: 'label-story-email' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Field labels are IBM Plex Mono caps in the muted colour. */
export const WithInput: Story = {
  render: (args) => (
    <div className="flex w-full max-w-sm flex-col gap-sp-6">
      <Label {...args} />
      <Input id="label-story-email" placeholder="you@example.com" />
    </div>
  ),
};

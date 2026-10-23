import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Textarea } from './textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  args: { 'aria-label': 'Message', placeholder: 'Tell the clan why you want to join' },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: 'Ranked grinder, mostly evenings UTC. Played with Ironveil last season.' },
};

export const Invalid: Story = { args: { 'aria-invalid': true } };

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Applications are closed.' },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';

import { Input } from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
  args: { 'aria-label': 'Email', placeholder: 'Placeholder' },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** border brand/default + overlay/focus-ring */
export const Focused: Story = {
  args: { defaultValue: 'kaze.player@mail.com' },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Email' });
    await userEvent.click(input);
    await expect(input).toHaveFocus();
  },
};

export const Valid: Story = {
  args: { 'aria-label': 'Clan tag', defaultValue: 'EMBR' },
  render: (args) => <Input {...args} data-valid="true" />,
};

export const Invalid: Story = {
  args: { 'aria-label': 'Player UID', defaultValue: '5281 9047 331', 'aria-invalid': true },
};

export const Disabled: Story = {
  args: { 'aria-label': 'Game', defaultValue: 'Call of Duty: Mobile', disabled: true },
};

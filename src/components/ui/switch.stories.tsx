import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { Field, FieldLabel } from './field';
import { Switch } from './switch';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  args: { 'aria-label': 'Email me about applications', onCheckedChange: fn() },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('switch'));
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  },
};

export const On: Story = { args: { defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true } };

export const WithLabel: Story = {
  args: { 'aria-label': undefined },
  render: (args) => (
    <Field orientation="horizontal" className="max-w-sm justify-between">
      <FieldLabel htmlFor="switch-story-email">Email me about applications</FieldLabel>
      <Switch {...args} id="switch-story-email" />
    </Field>
  ),
};

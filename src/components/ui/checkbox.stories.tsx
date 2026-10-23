import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { Checkbox } from './checkbox';
import { Field, FieldLabel } from './field';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  args: { 'aria-label': 'Remember me', onCheckedChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Remember me' }));
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  },
};

export const Checked: Story = { args: { defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true } };

export const Invalid: Story = { args: { 'aria-invalid': true } };

/** With a label beside it, the whole row is a 44px target. */
export const WithLabel: Story = {
  args: { 'aria-label': undefined },
  render: (args) => (
    <Field orientation="horizontal">
      <Checkbox {...args} id="checkbox-story-terms" />
      <FieldLabel htmlFor="checkbox-story-terms">I agree to the clan rules</FieldLabel>
    </Field>
  ),
};

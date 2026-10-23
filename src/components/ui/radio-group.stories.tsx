import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';

import { Field, FieldLabel } from './field';
import { RadioGroup, RadioGroupItem } from './radio-group';

const MODES = [
  { value: 'open', label: 'Open: anyone can apply' },
  { value: 'invite', label: 'Invite only' },
  { value: 'closed', label: 'Closed' },
];

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  args: { defaultValue: 'open', 'aria-label': 'Recruitment mode' },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Recruitment mode on Clan settings (D41/M41). */
export const RecruitmentMode: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      {MODES.map((mode) => (
        <Field key={mode.value} orientation="horizontal">
          <RadioGroupItem value={mode.value} id={`radio-story-${mode.value}`} />
          <FieldLabel htmlFor={`radio-story-${mode.value}`}>{mode.label}</FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('radio', { name: 'Closed' }));
    await expect(canvas.getByRole('radio', { name: 'Closed' })).toBeChecked();
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: RecruitmentMode.render,
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Field, FieldLabel } from './field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';

const ROLES = [
  { value: 'member', label: 'Member' },
  { value: 'staff', label: 'Staff' },
  { value: 'officer', label: 'Officer' },
];

const meta = {
  title: 'UI/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Role picker on Staff & roles (D36/M36). */
export const Role: Story = {
  render: (args) => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="select-story-role">Role</FieldLabel>
      <Select {...args} items={ROLES}>
        <SelectTrigger id="select-story-role">
          <SelectValue placeholder="Choose a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Roles</SelectLabel>
            {ROLES.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole('combobox', { name: 'Role' }));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole('option', { name: 'Staff' }));
    await expect(canvas.getByRole('combobox', { name: 'Role' })).toHaveTextContent('Staff');
  },
};

export const Invalid: Story = {
  render: (args) => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="select-story-game">Game</FieldLabel>
      <Select {...args}>
        <SelectTrigger id="select-story-game" aria-invalid>
          <SelectValue placeholder="Choose a game" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="codm">Call of Duty: Mobile</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  ),
};

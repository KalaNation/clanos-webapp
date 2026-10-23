import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

const ROLES = [
  { value: 'member', label: 'Member' },
  { value: 'staff', label: 'Staff' },
];

describe('Select', () => {
  it('opens its options and shows the chosen one', async () => {
    const onValueChange = vi.fn();
    render(
      <Select items={ROLES} onValueChange={onValueChange}>
        <SelectTrigger aria-label="Role">
          <SelectValue placeholder="Choose a role" />
        </SelectTrigger>
        <SelectContent>
          {ROLES.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    );
    const trigger = screen.getByRole('combobox', { name: 'Role' });
    expect(trigger).toHaveTextContent('Choose a role');

    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole('option', { name: 'Staff' }));

    expect(onValueChange).toHaveBeenCalledWith('staff', expect.anything());
    expect(trigger).toHaveTextContent('Staff');
  });
});

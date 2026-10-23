import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('accepts typing', async () => {
    render(<Input aria-label="Clan name" />);

    const input = screen.getByRole('textbox', { name: 'Clan name' });
    await userEvent.type(input, 'Nightfall Order');

    expect(input).toHaveValue('Nightfall Order');
  });

  it('exposes the error state to assistive technology', () => {
    render(<Input aria-label="Player UID" aria-invalid />);

    expect(screen.getByRole('textbox', { name: 'Player UID' })).toBeInvalid();
  });

  it('cannot be edited while disabled', async () => {
    render(<Input aria-label="Game" defaultValue="Call of Duty: Mobile" disabled />);

    const input = screen.getByRole('textbox', { name: 'Game' });
    await userEvent.type(input, 'x');

    expect(input).toBeDisabled();
    expect(input).toHaveValue('Call of Duty: Mobile');
  });
});

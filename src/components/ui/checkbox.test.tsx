import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('toggles on click and on Space', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Remember me" onCheckedChange={onCheckedChange} />);

    const checkbox = screen.getByRole('checkbox', { name: 'Remember me' });
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.keyboard(' ');
    expect(checkbox).not.toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledTimes(2);
  });

  it('cannot be changed while disabled', async () => {
    render(<Checkbox aria-label="Remember me" disabled />);

    const checkbox = screen.getByRole('checkbox', { name: 'Remember me' });
    await userEvent.click(checkbox, { pointerEventsCheck: 0 });

    expect(checkbox).not.toBeChecked();
  });
});

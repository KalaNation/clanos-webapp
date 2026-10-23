import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './switch';

describe('Switch', () => {
  it('turns on and off', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Pin announcement" onCheckedChange={onCheckedChange} />);

    const toggle = screen.getByRole('switch', { name: 'Pin announcement' });
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();

    await userEvent.click(toggle);
    expect(toggle).not.toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledTimes(2);
  });

  it('stays put while disabled', async () => {
    render(<Switch aria-label="Pin announcement" disabled defaultChecked />);

    const toggle = screen.getByRole('switch', { name: 'Pin announcement' });
    await userEvent.click(toggle, { pointerEventsCheck: 0 });

    expect(toggle).toBeChecked();
  });
});

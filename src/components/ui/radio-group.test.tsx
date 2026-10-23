import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RadioGroup, RadioGroupItem } from './radio-group';

function Modes({ onValueChange }: { onValueChange?: (value: unknown) => void }) {
  return (
    <RadioGroup aria-label="Recruitment mode" defaultValue="open" onValueChange={onValueChange}>
      <RadioGroupItem value="open" aria-label="Open" />
      <RadioGroupItem value="invite" aria-label="Invite only" />
      <RadioGroupItem value="closed" aria-label="Closed" />
    </RadioGroup>
  );
}

describe('RadioGroup', () => {
  it('selects one option at a time', async () => {
    const onValueChange = vi.fn();
    render(<Modes onValueChange={onValueChange} />);

    await userEvent.click(screen.getByRole('radio', { name: 'Closed' }));

    expect(screen.getByRole('radio', { name: 'Closed' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Open' })).not.toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith('closed', expect.anything());
  });

  it('moves the selection with the arrow keys', async () => {
    render(<Modes />);

    await userEvent.click(screen.getByRole('radio', { name: 'Open' }));
    await userEvent.keyboard('{ArrowDown}');

    expect(screen.getByRole('radio', { name: 'Invite only' })).toBeChecked();
  });
});

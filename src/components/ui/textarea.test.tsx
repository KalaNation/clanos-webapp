import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Textarea } from './textarea';

describe('Textarea', () => {
  it('accepts multi-line text', async () => {
    render(<Textarea aria-label="Rules" />);

    const textarea = screen.getByRole('textbox', { name: 'Rules' });
    await userEvent.type(textarea, 'Be on time.{Enter}No cheating.');

    expect(textarea).toHaveValue('Be on time.\nNo cheating.');
  });

  it('defaults to four rows and lets callers change it', () => {
    const { rerender } = render(<Textarea aria-label="Bio" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4');

    rerender(<Textarea aria-label="Bio" rows={8} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '8');
  });

  it('exposes the error state', () => {
    render(<Textarea aria-label="Message" aria-invalid />);

    expect(screen.getByRole('textbox', { name: 'Message' })).toBeInvalid();
  });
});

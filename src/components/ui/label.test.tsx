import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Label } from './label';

describe('Label', () => {
  it('names its control and focuses it when clicked', async () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );

    const input = screen.getByRole('textbox', { name: 'Email' });
    await userEvent.click(screen.getByText('Email'));

    expect(input).toHaveFocus();
  });
});

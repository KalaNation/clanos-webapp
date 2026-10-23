import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './sheet';

describe('Sheet', () => {
  it('opens as a dialog from the chosen side and closes again', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open menu</SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Revenant Syndicate</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const sheet = await screen.findByRole('dialog', { name: 'Revenant Syndicate' });
    expect(sheet).toHaveAttribute('data-side', 'left');

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

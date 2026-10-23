import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

function DeleteDialog() {
  return (
    <Dialog>
      <DialogTrigger>Delete clan</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Nightfall Order?</DialogTitle>
          <DialogDescription>This can’t be undone.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

describe('Dialog', () => {
  it('opens from its trigger, named by its title and described by its description', async () => {
    render(<DeleteDialog />);

    await userEvent.click(screen.getByRole('button', { name: 'Delete clan' }));

    const dialog = await screen.findByRole('dialog', { name: 'Delete Nightfall Order?' });
    expect(dialog).toHaveAccessibleDescription('This can’t be undone.');
  });

  it('closes with the close button and with Escape', async () => {
    render(<DeleteDialog />);
    const trigger = screen.getByRole('button', { name: 'Delete clan' });

    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(trigger);
    await screen.findByRole('dialog');
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

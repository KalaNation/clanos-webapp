import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button, buttonVariants } from './button';

describe('Button', () => {
  it('runs its action on click and from the keyboard', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Invite member</Button>);

    const button = screen.getByRole('button', { name: 'Invite member' });
    await userEvent.click(button);
    button.focus();
    await userEvent.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does nothing while disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });
    await userEvent.click(button, { pointerEventsCheck: 0 });

    expect(button).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('styles a real link through buttonVariants, so it is still announced as a link', () => {
    render(
      <a href="/clans/new" className={buttonVariants({ variant: 'secondary' })}>
        Create a clan
      </a>,
    );

    const link = screen.getByRole('link', { name: 'Create a clan' });
    expect(link).toHaveAttribute('href', '/clans/new');
    expect(link).toHaveClass('border-bd');
  });

  it('lets a className override the variant colours', () => {
    render(<Button className="bg-brand-2">Pressed</Button>);

    const button = screen.getByRole('button', { name: 'Pressed' });
    expect(button).toHaveClass('bg-brand-2');
    expect(button).not.toHaveClass('bg-brand');
  });
});

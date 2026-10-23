import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

describe('Tooltip', () => {
  it('appears on hover and goes away when the pointer leaves', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Notifications</TooltipTrigger>
          <TooltipContent>3 new notifications</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.queryByText('3 new notifications')).not.toBeInTheDocument();

    await userEvent.hover(screen.getByRole('button', { name: 'Notifications' }));
    expect(await screen.findByText('3 new notifications')).toBeInTheDocument();
  });
});

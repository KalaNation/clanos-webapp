import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TooltipProvider } from '@/components/ui/tooltip';

import { ComponentsShowcase } from './components-showcase';

describe('ComponentsShowcase', () => {
  it('shows every section of the Foundations frames', () => {
    render(
      <TooltipProvider>
        <ComponentsShowcase />
      </TooltipProvider>,
    );

    for (const section of [
      'Buttons',
      'Inputs',
      'Selection controls',
      'Status badges',
      'Data states',
      'Overlays',
    ]) {
      expect(screen.getByRole('heading', { name: section })).toBeInTheDocument();
    }
  });

  it('includes every status badge', () => {
    render(
      <TooltipProvider>
        <ComponentsShowcase />
      </TooltipProvider>,
    );

    const badges = screen
      .getByRole('heading', { name: 'Status badges' })
      .closest('[data-slot=card]');
    for (const label of ['Active', 'Pending', 'Suspended', 'Revoked', 'Unverified', 'Locked']) {
      expect(within(badges as HTMLElement).getByText(label)).toBeInTheDocument();
    }
  });
});

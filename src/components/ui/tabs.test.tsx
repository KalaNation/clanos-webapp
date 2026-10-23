import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

function MemberTabs({ onValueChange }: { onValueChange?: (value: unknown) => void }) {
  return (
    <Tabs defaultValue="all" onValueChange={onValueChange}>
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="invitations">Invitations</TabsTrigger>
      </TabsList>
      <TabsContent value="all">Everyone</TabsContent>
      <TabsContent value="invitations">Open invitations</TabsContent>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('shows the panel of the selected tab', async () => {
    const onValueChange = vi.fn();
    render(<MemberTabs onValueChange={onValueChange} />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Everyone');

    await userEvent.click(screen.getByRole('tab', { name: 'Invitations' }));

    expect(screen.getByRole('tab', { name: 'Invitations' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Open invitations');
    expect(onValueChange).toHaveBeenCalledWith('invitations', expect.anything());
  });

  it('moves between tabs with the arrow keys', async () => {
    render(<MemberTabs />);

    await userEvent.click(screen.getByRole('tab', { name: 'All' }));
    await userEvent.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Invitations' })).toHaveFocus();
  });
});

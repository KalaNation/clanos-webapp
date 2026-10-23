import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BellIcon } from 'lucide-react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button } from './button';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnIconButton: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger
        render={<Button variant="secondary" size="icon" aria-label="Notifications" />}
      >
        <BellIcon />
      </TooltipTrigger>
      <TooltipContent>3 new notifications</TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.hover(canvas.getByRole('button', { name: 'Notifications' }));
    const body = within(canvasElement.ownerDocument.body);
    const tooltip = await body.findByText('3 new notifications');
    await waitFor(() => expect(tooltip).toBeVisible());
  },
};

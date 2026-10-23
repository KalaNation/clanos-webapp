import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { toast } from 'sonner';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button } from './button';
import { Toaster } from './sonner';

const meta = {
  title: 'UI/Toaster',
  component: Toaster,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Toasts confirm an action; errors that need a fix belong in the form, not a toast. */
export const Kinds: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-sp-8 p-gutter">
      <Button variant="secondary" onClick={() => toast.success('Invitation sent to 2 players')}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast.info('Recruitment is open')}>
        Info
      </Button>
      <Button variant="secondary" onClick={() => toast.warning('You have unsaved changes')}>
        Warning
      </Button>
      <Button variant="secondary" onClick={() => toast.error('Couldn’t load members')}>
        Error
      </Button>
      <Toaster {...args} />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Success' }));
    const body = within(canvasElement.ownerDocument.body);
    const message = await body.findByText('Invitation sent to 2 players');
    await waitFor(() => expect(message).toBeVisible());
  },
};

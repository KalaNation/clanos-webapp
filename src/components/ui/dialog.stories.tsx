import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button } from './button';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Field, FieldDescription, FieldLabel } from './field';
import { Input } from './input';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** InviteDialog (D33). Below 768px the same dialog opens as a bottom sheet (M33). */
export const InviteMember: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button />}>Invite member</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite members</DialogTitle>
          <DialogDescription>Invites last 7 days.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field>
            <FieldLabel htmlFor="dialog-story-email">Email addresses</FieldLabel>
            <Input id="dialog-story-email" placeholder="player@example.com" />
            <FieldDescription>Separate several addresses with commas.</FieldDescription>
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
          <Button>Send invites</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Invite member' }));
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole('dialog', { name: 'Invite members' });
    await waitFor(() => expect(dialog).toBeVisible());
    await userEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }));
  },
};

/** Delete clan (D42/M42): a destructive confirmation. */
export const DeleteConfirmation: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="destructive" />}>Delete clan</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Nightfall Order?</DialogTitle>
          <DialogDescription>
            Members, teams, rules and announcements are removed. This can’t be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Keep clan</DialogClose>
          <Button variant="destructiveFill">Delete clan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

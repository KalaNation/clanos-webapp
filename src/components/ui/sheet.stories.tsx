import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MenuIcon } from 'lucide-react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button } from './button';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

const meta = {
  title: 'UI/Sheet',
  component: Sheet,
  parameters: { viewport: { defaultViewport: 'mobile' } },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Navigation drawer (M43): slides in from the left, as wide as --nav-side-panel. */
export const Drawer: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Revenant Syndicate</SheetTitle>
          <SheetDescription>Clan Master</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <nav aria-label="Clan" className="flex flex-col gap-sp-4 t-body text-tx-2">
            <a href="#members">Members</a>
            <a href="#recruitment">Recruitment</a>
            <a href="#staff">Staff &amp; roles</a>
          </nav>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open menu' }));
    const body = within(canvasElement.ownerDocument.body);
    const drawer = await body.findByRole('dialog', { name: 'Revenant Syndicate' });
    await waitFor(() => expect(drawer).toBeVisible());
  },
};

/** Member actions sheet (M31): an action list that opens at its own height. */
export const ActionSheet: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="secondary" />}>Member actions</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Officer_Vex</SheetTitle>
        </SheetHeader>
        <SheetFooter>
          <Button variant="secondary" size="lg">
            Change role
          </Button>
          <Button variant="destructive" size="lg">
            Suspend member
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

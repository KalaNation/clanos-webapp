import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { expect, fn, userEvent } from 'storybook/test';

import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  args: { children: 'Primary', onClick: fn() },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'muted',
        'destructive',
        'destructiveFill',
        'ghost',
        'dashed',
      ],
    },
    size: { control: 'select', options: ['lg', 'default', 'sm', 'icon', 'iconSm'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Primary' }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** brand/pressed: the hover and active colour of a primary button. */
export const Pressed: Story = {
  args: { children: 'Pressed', className: 'border-brand-2 bg-brand-2' },
};

export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } };

export const Muted: Story = { args: { variant: 'muted', size: 'sm', children: 'Reject' } };

export const Destructive: Story = { args: { variant: 'destructive', children: 'Destructive' } };

export const DestructiveFill: Story = {
  args: {
    variant: 'destructiveFill',
    children: (
      <>
        <Trash2Icon /> Delete
      </>
    ),
  },
};

export const Ghost: Story = { args: { variant: 'ghost', children: 'Ghost' } };

export const Dashed: Story = {
  args: {
    variant: 'dashed',
    children: (
      <>
        <PlusIcon /> Create
      </>
    ),
  },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Disabled' });
    await expect(button).toBeDisabled();
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/** Large 48 (44 on desktop) · Default 44 · Small 36 (32 on desktop) with a 44px touch area. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-sp-12">
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="icon" aria-label="Create">
        <PlusIcon />
      </Button>
      <Button {...args} size="iconSm" variant="secondary" aria-label="Create">
        <PlusIcon />
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: { size: 'lg', className: 'w-full', children: 'Create account' },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ScreenPlaceholder } from './screen-placeholder';

const meta = {
  title: 'Layout/ScreenPlaceholder',
  component: ScreenPlaceholder,
  args: { title: 'Clan directory', screens: ['D18', 'M18', 'M19'] },
} satisfies Meta<typeof ScreenPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

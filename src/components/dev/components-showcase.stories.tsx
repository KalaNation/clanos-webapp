import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ComponentsShowcase } from './components-showcase';

const meta = {
  title: 'Dev/Components showcase',
  component: ComponentsShowcase,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ComponentsShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The same gallery as /dev/components, compared against D45 at 1440px. */
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };

/** Compared against M45 at 390px. */
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };

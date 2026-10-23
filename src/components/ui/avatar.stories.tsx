import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount } from './avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No image: the striped placeholder from the design. */
export const Placeholder: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback role="img" aria-label="Rhen_Valkyr" />
    </Avatar>
  ),
};

export const Initials: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>RV</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-sp-12">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback role="img" aria-label={`${size} avatar`} />
        </Avatar>
      ))}
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>OV</AvatarFallback>
      <AvatarBadge role="img" aria-label="Online" />
    </Avatar>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      {['RV', 'OV', 'RK'].map((initials) => (
        <Avatar key={initials}>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+45</AvatarGroupCount>
    </AvatarGroup>
  ),
};

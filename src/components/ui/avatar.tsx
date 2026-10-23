'use client';

import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import type * as React from 'react';

import { cn } from '@/lib/utils';

type AvatarSize = 'sm' | 'default' | 'lg';

/**
 * Player avatar. Without an image it shows the striped placeholder; give that placeholder
 * `role="img"` and an `aria-label`. TODO(token): 26, 36, 40, 60 and 72px avatars have no token.
 */
function Avatar({
  className,
  size = 'default',
  ...props
}: AvatarPrimitive.Root.Props & { size?: AvatarSize }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        'group/avatar relative flex size-sp-32 shrink-0 rounded-full select-none data-[size=lg]:size-touch data-[size=sm]:size-sp-28',
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full rounded-full object-cover', className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center rounded-full t-data-strong text-tx bg-stripes-avatar',
        className,
      )}
      {...props}
    />
  );
}

/** A small dot on the avatar, e.g. online status. Give it an accessible label. */
function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        'absolute right-0 bottom-0 z-10 inline-flex size-sp-10 rounded-full bg-ok ring-2 ring-s1',
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        'flex -space-x-sp-8 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-s1',
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        'relative flex size-sp-32 shrink-0 items-center justify-center rounded-full bg-s2 t-data text-mut ring-2 ring-s1',
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage };

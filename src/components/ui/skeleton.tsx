import type * as React from 'react';

import { cn } from '@/lib/utils';

/** Loading placeholder. Data screens show skeletons while loading, never a spinner (D45). */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn('animate-pulse rounded-sm bg-s2', className)}
      {...props}
    />
  );
}

export { Skeleton };

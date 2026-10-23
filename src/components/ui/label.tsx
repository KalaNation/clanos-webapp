'use client';

import type * as React from 'react';

import { cn } from '@/lib/utils';

/** Form field label: IBM Plex Mono caps in the muted colour (the design's "field label" style). */
function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control -- callers pass htmlFor
    <label
      data-slot="label"
      className={cn(
        'flex items-center gap-sp-8 t-field-label text-mut select-none',
        'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Label };

import type * as React from 'react';

import { fieldStates } from '@/lib/styles';
import { cn } from '@/lib/utils';

const DEFAULT_ROWS = 4;

/** Multi-line text field with the same states as Input. Height comes from `rows`. */
function Textarea({ className, rows = DEFAULT_ROWS, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      className={cn(
        'w-full min-w-0 rounded-md border border-bd bg-bg p-sp-12 t-input text-tx placeholder:text-mut',
        fieldStates,
        'disabled:cursor-not-allowed disabled:bg-s2 disabled:text-mut',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };

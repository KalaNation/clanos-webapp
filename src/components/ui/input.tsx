import { Input as InputPrimitive } from '@base-ui/react/input';
import type * as React from 'react';

import { fieldStates } from '@/lib/styles';
import { cn } from '@/lib/utils';

/**
 * Text field (M45 Inputs). `aria-invalid` shows the error state and `data-valid` the valid one.
 * Text uses --t-input, which is 16px on mobile so iOS doesn't zoom in on focus.
 */
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'h-control w-full min-w-0 rounded-md border border-bd bg-bg px-sp-12 t-input text-tx placeholder:text-mut',
        fieldStates,
        'disabled:cursor-not-allowed disabled:bg-s2 disabled:text-mut',
        'file:border-0 file:bg-transparent file:t-ui file:text-tx',
        className,
      )}
      {...props}
    />
  );
}

export { Input };

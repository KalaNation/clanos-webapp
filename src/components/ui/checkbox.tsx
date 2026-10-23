'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { CheckIcon } from 'lucide-react';

import { focusRing, touchTarget } from '@/lib/styles';
import { cn } from '@/lib/utils';

/** Checkbox (M45 Selection controls): brand fill when checked, 44px touch area. */
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // TODO(token): the design's checkbox is 22px with a 1.5px border.
        'peer flex size-sp-20 shrink-0 items-center justify-center rounded-sm border-2 border-bd bg-bg text-on-brand transition-colors',
        touchTarget,
        focusRing,
        'aria-invalid:border-bad data-checked:border-brand data-checked:bg-brand',
        'data-disabled:cursor-not-allowed data-disabled:opacity-45',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center [&>svg]:size-sp-16"
      >
        <CheckIcon strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

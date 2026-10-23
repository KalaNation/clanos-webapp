'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';

import { focusRing, touchTarget } from '@/lib/styles';
import { cn } from '@/lib/utils';

/** A group of radio items; arrow keys move between them. */
function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn('grid w-full gap-sp-12', className)}
      {...props}
    />
  );
}

/** Radio (M45 Selection controls): brand ring and dot when selected, 44px touch area. */
function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        // TODO(token): the design's radio is 22px with a 1.5px border.
        'peer flex aspect-square size-sp-20 shrink-0 items-center justify-center rounded-full border-2 border-bd bg-bg transition-colors',
        touchTarget,
        focusRing,
        'aria-invalid:border-bad data-checked:border-brand',
        'data-disabled:cursor-not-allowed data-disabled:opacity-45',
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="size-sp-10 rounded-full bg-brand"
      />
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };

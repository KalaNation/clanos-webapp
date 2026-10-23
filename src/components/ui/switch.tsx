'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';

import { focusRing, touchTarget } from '@/lib/styles';
import { cn } from '@/lib/utils';

/**
 * Toggle (M45 Selection controls): 46 × 28 track and a 20px thumb. The track width is two
 * thumbs plus a 6px gap, so the size follows the space tokens.
 */
function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'group/switch inline-flex h-sp-28 w-[calc(var(--sp-20)*2+var(--sp-6))] shrink-0 items-center rounded-full border border-bd bg-s2 p-[calc(var(--sp-6)/2)] transition-colors',
        touchTarget,
        focusRing,
        'data-checked:border-brand data-checked:bg-brand',
        'data-disabled:cursor-not-allowed data-disabled:opacity-45',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-sp-20 rounded-full bg-mut transition-transform data-checked:translate-x-[calc(100%-2px)] data-checked:bg-on-brand"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

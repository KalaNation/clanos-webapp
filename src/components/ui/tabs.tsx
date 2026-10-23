'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cva, type VariantProps } from 'class-variance-authority';

import { focusRing } from '@/lib/styles';
import { cn } from '@/lib/utils';

/** Tabs. Keep the active tab in the URL (`?tab=invitations`) so the view can be shared. */
function Tabs({ className, orientation = 'horizontal', ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn('group/tabs flex gap-sp-16 data-horizontal:flex-col', className)}
      {...props}
    />
  );
}

const tabsListVariants = cva('group/tabs-list flex w-full', {
  variants: {
    variant: {
      // TODO(token): section tabs are 22px apart in the design.
      underline: 'gap-sp-20 overflow-x-auto border-b border-bd bg-s1 px-gutter',
      segmented: 'gap-sp-4 rounded-lg border border-bd bg-bg p-sp-4',
    },
  },
  defaultVariants: { variant: 'underline' },
});

/**
 * Underline tabs switch between sections of a page and scroll sideways on mobile. Segmented
 * tabs pick between a few options inside a card.
 */
function TabsList({
  className,
  variant = 'underline',
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-sp-6 t-ui whitespace-nowrap text-mut transition-colors hover:text-tx',
        focusRing,
        'data-disabled:pointer-events-none data-disabled:opacity-45',
        'group-data-[variant=underline]/tabs-list:h-touch group-data-[variant=underline]/tabs-list:border-b-2 group-data-[variant=underline]/tabs-list:border-transparent',
        'group-data-[variant=underline]/tabs-list:data-active:border-brand group-data-[variant=underline]/tabs-list:data-active:text-tx',
        'group-data-[variant=segmented]/tabs-list:h-control-sm group-data-[variant=segmented]/tabs-list:flex-1 group-data-[variant=segmented]/tabs-list:rounded-sm group-data-[variant=segmented]/tabs-list:border group-data-[variant=segmented]/tabs-list:border-transparent',
        'group-data-[variant=segmented]/tabs-list:data-active:border-bd group-data-[variant=segmented]/tabs-list:data-active:bg-s2 group-data-[variant=segmented]/tabs-list:data-active:text-tx',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-sp-16",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, tabsListVariants, TabsTrigger };

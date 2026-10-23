'use client';

import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { cva } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import type * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function Sheet(props: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal(props: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-scrim transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0',
        className,
      )}
      {...props}
    />
  );
}

type SheetSide = 'left' | 'right' | 'bottom';

const sheetVariants = cva(
  'fixed z-50 flex flex-col border-bd bg-s1 text-tx transition duration-200 ease-in-out outline-none data-ending-style:opacity-0 data-starting-style:opacity-0',
  {
    variants: {
      side: {
        left: 'inset-y-0 left-0 h-full w-side-panel max-w-full border-r data-ending-style:-translate-x-full data-starting-style:-translate-x-full',
        right:
          'inset-y-0 right-0 h-full w-side-panel max-w-full border-l data-ending-style:translate-x-full data-starting-style:translate-x-full',
        bottom:
          'inset-x-0 bottom-0 max-h-[calc(100dvh-var(--nav-top-bar))] rounded-t-xl border border-b-0 data-ending-style:translate-y-full data-starting-style:translate-y-full',
      } satisfies Record<SheetSide, string>,
    },
  },
);

/**
 * A panel that slides in from an edge. `left` is the mobile navigation drawer (M43), `bottom`
 * an action sheet such as the member actions sheet (M31).
 */
function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & { side?: SheetSide; showCloseButton?: boolean }) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {side === 'bottom' ? (
          // TODO(token): the grabber is 36 × 5 in the design.
          <div aria-hidden="true" className="mx-auto mt-sp-8 h-sp-4 w-sp-32 rounded-full bg-bd" />
        ) : null}
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button variant="ghost" size="icon" className="absolute top-sp-12 right-sp-4" />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        'flex flex-col gap-sp-4 border-b border-bd py-sp-12 pr-touch pl-gutter',
        className,
      )}
      {...props}
    />
  );
}

/** Scrollable middle of the sheet. */
function SheetBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-body"
      className={cn('flex flex-1 flex-col gap-section overflow-y-auto p-gutter', className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        'mt-auto flex flex-col gap-sp-8 border-t border-bd px-gutter py-sp-12',
        className,
      )}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title data-slot="sheet-title" className={cn('t-h2', className)} {...props} />
  );
}

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('t-body text-mut', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};

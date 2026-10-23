'use client';

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { XIcon } from 'lucide-react';
import type * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 isolate z-50 bg-scrim duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
        className,
      )}
      {...props}
    />
  );
}

/**
 * A bottom sheet below 768px and a centred dialog above it (AGENTS.md section 3). On mobile it
 * stops below the app bar, so a long form never covers the whole screen.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & { showCloseButton?: boolean }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 flex max-h-[calc(100dvh-var(--nav-top-bar))] flex-col rounded-t-xl border border-b-0 border-bd bg-s1 text-tx outline-none',
          // TODO(token): the 500px desktop dialog width has no layout token.
          'md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:max-h-[calc(100dvh-var(--sp-32)*2)] md:w-full md:max-w-lg md:-translate-1/2 md:rounded-xl md:border-b',
          'duration-200 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom md:data-open:slide-in-from-bottom-0 md:data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom md:data-closed:slide-out-to-bottom-0 md:data-closed:zoom-out-95',
          className,
        )}
        {...props}
      >
        {/* TODO(token): the grabber is 36 × 5 in the design. */}
        <div
          aria-hidden="true"
          className="mx-auto mt-sp-8 h-sp-4 w-sp-32 rounded-full bg-bd md:hidden"
        />
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-sp-12 right-sp-4 md:top-sp-8 md:right-sp-8"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        'flex flex-col gap-sp-4 border-b border-bd py-sp-12 pr-touch pl-gutter md:py-sp-16 md:pl-sp-20',
        className,
      )}
      {...props}
    />
  );
}

/** Scrollable middle of the dialog, where the form or content goes. */
function DialogBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(
        'flex flex-col gap-section overflow-y-auto px-gutter py-gutter md:px-sp-20 md:py-sp-20',
        className,
      )}
      {...props}
    />
  );
}

/** Actions. Put the main action last: it ends up on top on mobile and on the right on desktop. */
function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-sp-8 border-t border-bd px-gutter py-sp-12 md:flex-row md:justify-end md:px-sp-20',
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title data-slot="dialog-title" className={cn('t-h2', className)} {...props} />
  );
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('t-body text-mut', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

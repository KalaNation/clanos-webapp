import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const cardVariants = cva('flex flex-col overflow-hidden rounded-lg border text-tx', {
  variants: {
    variant: {
      default: 'border-bd bg-s1',
      dashed: 'border-dashed border-bd bg-s1',
      sunk: 'border-bd bg-bg',
    },
  },
  defaultVariants: { variant: 'default' },
});

/**
 * Card shell (D45/M45): elevation comes from the border, never a shadow. `dashed` is for
 * empty states and `sunk` for content set into the page, like loading placeholders.
 */
function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
  return <div data-slot="card" className={cn(cardVariants({ variant }), className)} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'flex items-center justify-between gap-sp-12 border-b border-bd px-card py-sp-12',
        className,
      )}
      {...props}
    />
  );
}

/** Card heading. Pick the `level` that fits the page outline; it defaults to h3. */
function CardTitle({
  className,
  children,
  level = 3,
  ...props
}: React.ComponentProps<'h3'> & { level?: 2 | 3 | 4 }) {
  const Heading = `h${String(level)}` as 'h2' | 'h3' | 'h4';
  return (
    <Heading data-slot="card-title" className={cn('t-body-strong', className)} {...props}>
      {children}
    </Heading>
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p data-slot="card-description" className={cn('t-caption text-mut', className)} {...props} />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-action" className={cn('ml-auto shrink-0', className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('flex flex-col gap-sp-12 p-card', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center gap-sp-8 border-t border-bd px-card py-sp-12', className)}
      {...props}
    />
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };

'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { CircleXIcon } from 'lucide-react';
import type * as React from 'react';
import { useMemo } from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

/**
 * Form layout primitives, used with React Hook Form's `Controller` (see the Field stories).
 * A field shows its error through `data-invalid` on Field and `aria-invalid` on the control.
 */
function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn('flex flex-col gap-section', className)}
      {...props}
    />
  );
}

function FieldLegend({ className, ...props }: React.ComponentProps<'legend'>) {
  return (
    <legend
      data-slot="field-legend"
      className={cn('mb-sp-8 t-field-label text-mut', className)}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn('group/field-group flex w-full flex-col gap-section', className)}
      {...props}
    />
  );
}

const fieldVariants = cva('group/field flex w-full', {
  variants: {
    orientation: {
      vertical: 'flex-col gap-sp-6',
      horizontal: 'min-h-touch flex-row items-center gap-sp-12',
    },
  },
  defaultVariants: { orientation: 'vertical' },
});

/** One form field: label, control, hint and error. Use horizontal for checkboxes and toggles. */
function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn('flex flex-1 flex-col gap-sp-4', className)}
      {...props}
    />
  );
}

/** The field's label. Beside a checkbox or toggle it uses body text, not the caps label style. */
function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'group-data-[disabled=true]/field:opacity-50',
        'group-data-[orientation=horizontal]/field:t-body group-data-[orientation=horizontal]/field:text-tx group-data-[orientation=horizontal]/field:normal-case',
        className,
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="field-title" className={cn('t-body-strong', className)} {...props} />;
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn('t-caption text-mut [&>a]:text-brand [&>a:hover]:text-brand-3', className)}
      {...props}
    />
  );
}

/** "OR"-style divider between groups of fields, e.g. between sign-in methods. */
function FieldSeparator({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-separator"
      className={cn('flex items-center gap-sp-12 t-label text-mut', className)}
      {...props}
    >
      <span aria-hidden="true" className="h-px flex-1 bg-bd" />
      {children}
      {children ? <span aria-hidden="true" className="h-px flex-1 bg-bd" /> : null}
    </div>
  );
}

/** Error text under a field. Pass `errors` from React Hook Form or your own children. */
function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & { errors?: ({ message?: string } | undefined)[] }) {
  const content = useMemo(() => {
    if (children) return children;
    const messages = [...new Set(errors?.map((error) => error?.message).filter(Boolean))];
    if (messages.length === 0) return null;
    if (messages.length === 1) return messages[0];
    return (
      <ul className="flex list-disc flex-col gap-sp-4 pl-sp-16">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    );
  }, [children, errors]);

  if (!content) return null;

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('flex items-start gap-sp-6 t-caption text-bad', className)}
      {...props}
    >
      <CircleXIcon aria-hidden="true" className="size-sp-16 shrink-0" />
      <div>{content}</div>
    </div>
  );
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
};

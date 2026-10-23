import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { focusRing, touchTarget } from '@/lib/styles';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-sp-8 rounded-md border t-ui whitespace-nowrap transition-colors select-none',
    focusRing,
    'data-disabled:cursor-not-allowed data-disabled:border-bd data-disabled:bg-s2 data-disabled:text-mut',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-sp-16",
  ],
  {
    variants: {
      variant: {
        primary:
          'border-brand bg-brand text-on-brand hover:border-brand-2 hover:bg-brand-2 active:border-brand-2 active:bg-brand-2',
        secondary: 'border-bd bg-transparent text-tx hover:bg-s2',
        muted: 'border-bd bg-transparent text-mut hover:bg-s2 hover:text-tx',
        destructive: 'border-bd bg-transparent text-bad hover:bg-s2',
        destructiveFill: 'border-bad bg-bad text-on-bad',
        ghost: 'border-transparent bg-transparent text-mut hover:bg-s2 hover:text-tx',
        dashed: 'border-dashed border-bd bg-transparent text-brand hover:bg-s2',
      },
      size: {
        lg: 'h-control px-sp-16',
        default: 'h-touch px-sp-16',
        // TODO(token): small buttons use 13px text on mobile too; t-ui is 14px there.
        sm: cn('h-control-sm rounded-sm px-sp-12', touchTarget),
        icon: 'size-touch',
        iconSm: cn('size-control-sm rounded-sm', touchTarget),
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

/**
 * The CLANOS button (D45/M45). Large is the full-width primary action, default is 44px, and
 * small keeps a 44px touch area. For navigation use `<Link className={buttonVariants()}>`.
 */
function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, type ButtonProps, buttonVariants };

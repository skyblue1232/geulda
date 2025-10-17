import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all ',
  {
    variants: {
      variant: {
        default: 'px-[1.5rem] ',
        ghost: ' text-label-lg',
      },
      size: {
        icon: 'size-16',
      },
      tone: {
        pink: 'text-pink-200 bg-pink-50 border border-pink-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  tone,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className, tone }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

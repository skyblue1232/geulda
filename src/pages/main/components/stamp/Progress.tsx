import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/shared/lib';

export interface ProgressProps
  extends Omit<
    React.ComponentProps<typeof ProgressPrimitive.Root>,
    'value' | 'max'
  > {
  value: number;
}

export default function Progress({
  className,
  value,
  ...props
}: ProgressProps) {
  const progressPercent = Math.max(0, Math.min(100, value));

  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn(
        'relative w-full h-[10px] sm:h-[12px] rounded-full',
        'bg-transparent overflow-visible',
        "before:content-[''] before:absolute before:inset-0 before:rounded-full",
        'before:border before:border-dotted before:border-pink-400/70',
        className,
      )}
      value={progressPercent}
      max={100}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2',
          'h-[10px] sm:h-[12px] rounded-full',
          'bg-gradient-to-r from-pink-500 to-fuchsia-500',
          'shadow-[0_0_0_1px_rgba(255,255,255,0.6)]',
        )}
        style={{ width: `${progressPercent}%` }}
      />
    </ProgressPrimitive.Root>
  );
}

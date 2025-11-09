'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/shared/lib';

export interface ProgressProps
  extends Omit<
    React.ComponentProps<typeof ProgressPrimitive.Root>,
    'value' | 'max'
  > {
  value: number;
}

const Progress = ({ className, value, ...props }: ProgressProps) => {
  const progressPercent = Math.max(0, Math.min(100, value));

  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn(
        'relative w-full h-[0.4rem] rounded-full',
        'bg-transparent bg-pink-100 ',
        className,
      )}
      value={progressPercent}
      max={100}
      aria-label="진행률"
      aria-valuetext={`${Math.round(progressPercent)}% 완료됨`}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2',
          'h-[0.4rem]  rounded-full',
          'bg-gradient-to-r from-pink-200 to-pink-400',
        )}
        style={{ width: `${progressPercent}%` }}
      />
    </ProgressPrimitive.Root>
  );
};

export default Progress;

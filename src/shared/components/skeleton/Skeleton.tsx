// src/shared/components/ui/Skeleton.tsx
import { cn } from '@/shared/lib';

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn('animate-pulse bg-gray-200 rounded-md', className)} />
  );
};

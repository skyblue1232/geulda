'use client';

import Image from 'next/image';
import { cn } from '@/shared/lib';
import { cva, type VariantProps } from 'class-variance-authority';

interface PostcardContainerProps {
  postcards: string[];
  onClickCard?: (index: number) => void;
  className?: string;
  bordered?: boolean;
}

const postcardContainerStyle = cva(
  `
  layout-grid w-full
  rounded-[20px] border bg-pink-50 border-pink-200
  p-2.5 gap-2.5
  grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))]
  transition-all
  `,
  {
    variants: {
      bordered: {
        false: 'border-none',
      },
    },
    defaultVariants: {
      bordered: true,
    },
  },
);

const postcardCardStyle = cva(
  `
  flex aspect-square rounded-[8px]
  border border-pink-200 overflow-hidden
  bg-gray-100 transition
  `,
  {
    variants: {
      interactive: {
        true: 'cursor-pointer hover:opacity-80',
        false: 'cursor-default',
      },
    },
    defaultVariants: {
      interactive: true,
    },
  },
);

export default function PostcardContainer({
  postcards = [],
  onClickCard,
  className,
  bordered,
}: PostcardContainerProps) {
  // 엽서 기본 8개 (null placeholder유지) + 그 외는 아래로 채움
  const totalSlots = Math.max(postcards.length, 8);
  const filledSlots = Array(totalSlots)
    .fill(null)
    .map((_, i) => postcards[i] ?? null);

  return (
    <div className={cn(postcardContainerStyle({ bordered }), className)}>
      {filledSlots.map((src, idx) => (
        <button
          key={idx}
          onClick={() => src && onClickCard?.(idx)}
          disabled={!src}
          aria-disabled={!src}
          className={cn(
            postcardCardStyle({ interactive: !!src }),
            !src && 'items-center justify-center bg-gray-200',
          )}
        >
          {src && (
            <Image
              src={src}
              alt={`엽서 ${idx + 1}`}
              width={200}
              height={200}
              className='w-full h-full object-cover'
            />
          )}
        </button>
      ))}
    </div>
  );
}

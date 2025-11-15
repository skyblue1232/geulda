'use client';

import Image from 'next/image';
import { cn } from '@/shared/lib';
import { cva } from 'class-variance-authority';

interface PostcardItem {
  postcardId: number;
  imageUrl: string;
  placeName: string;
}

interface PostcardContainerProps {
  postcards: PostcardItem[];
  onClickCard?: (id: number) => void;
  className?: string;
  bordered?: boolean;
}

const postcardContainerStyle = cva(
  `
  layout-grid w-full
  rounded-[20px] border bg-pink-50 border-pink-200
  p-[1.2rem] gap-[0.6rem]
  overflow-y-hidden no-scrollbar
  transition-all
  `,
  {
    variants: {
      bordered: { false: 'border-none' },
    },
    defaultVariants: { bordered: true },
  },
);

const postcardGridStyle = `
 grid grid-rows-2 grid-flow-col
auto-cols-[minmax(70px,70px)]
gap-[0.6rem]
`;

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
    defaultVariants: { interactive: true },
  },
);

export default function PostcardContainer({
  postcards = [],
  onClickCard,
  className,
  bordered,
}: PostcardContainerProps) {
  // 엽서 기본 8개 (null placeholder유지) + 9개 부터는 가로 스크롤
  const totalSlots = Math.max(postcards.length, 8);
  const filledSlots = Array(totalSlots)
    .fill(null)
    .map((_, i) => postcards[i] ?? null);

  return (
    <div
      className={cn(
        postcardContainerStyle({ bordered }),
        className,
        postcards.length > 8 && 'overflow-x-auto',
      )}
    >
      <div
        className={cn(
          postcardGridStyle,
          postcards.length <= 8 && 'justify-center gap-[1.2rem] ',
        )}
      >
        {filledSlots.map((card, idx) =>
          card ? (
            <button
              key={card.postcardId}
              onClick={() => onClickCard?.(card.postcardId)}
              className={postcardCardStyle({ interactive: true })}
            >
              <Image
                src={card.imageUrl.trim()}
                alt={card.placeName}
                width={200}
                height={200}
                className='w-full h-full object-cover'
              />
            </button>
          ) : (
            <div
              key={idx}
              className='w-[70px] h-[70px] rounded-[8px] bg-pink-100'
            />
          ),
        )}
      </div>
    </div>
  );
}

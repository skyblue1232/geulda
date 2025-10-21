import { cn } from '@/shared/lib';
import * as React from 'react';
import Progress from './Progress';

export interface StampBoardProps {
  count: number;
  total?: number;
  className?: string;
}

export default function StampBoard({
  count,
  total = 8,
  className,
}: StampBoardProps) {
  const clamped = Math.max(0, Math.min(total, count));
  const percent = (clamped / total) * 100;

  return (
    <section
      className={cn(
        'w-full rounded-[32px] ',
        'border border-pink-100 bg-pink-50',
        'px-[2.1rem] py-[1.3rem] gap-[0.4rem]',
        className,
      )}
      aria-label='스탬프 보드'
    >
      {/* 헤더 */}
      <header className='mb-6 flex items-baseline justify-between'>
        <span className='relative text-body-md text-pink-500'>
          스탬프 수집 현황
        </span>
        <span className='text-body-md text-pink-500'>
          {clamped}/{total}
        </span>
      </header>

      {/* 스탬프 행 */}
      <ul
        role='list'
        className='mb-5 grid grid-cols-8 gap-3 md:gap-4'
        aria-label='스탬프 목록'
      >
        {Array.from({ length: total }).map((_, i) => (
          <li key={i} className='flex items-center justify-center'>
            <div
              className={cn(
                'size-12 md:size-16 rounded-full border',
                i < clamped
                  ? 'bg-pink-400/55 border-pink-400'
                  : 'bg-pink-200/60 border-pink-200',
              )}
              aria-label={`${i + 1}번째 스탬프 ${
                i < clamped ? '획득' : '미획득'
              }`}
            />
          </li>
        ))}
      </ul>

      <Progress value={percent} className='my-[0.6rem]' />
    </section>
  );
}

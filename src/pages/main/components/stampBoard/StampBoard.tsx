import { cn } from '@/shared/lib';
import * as React from 'react';
import Progress from './Progress';
import { Icon } from '@/shared/icons';

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
        'flex flex-col gap-[0.4rem] px-[2.1rem] py-[1.3rem] ',
        className,
      )}
      aria-label='스탬프 보드'
    >
      {/* 헤더 */}
      <header className='flex items-baseline justify-between'>
        <span className='relative text-body-md text-pink-500'>
          스탬프 수집 현황
        </span>
        <span className='text-body-md text-pink-500'>
          {clamped}/{total}
        </span>
      </header>

      {/* 스탬프 행 */}
      <ul role='list' className=' grid grid-cols-8 ' aria-label='스탬프 목록'>
        {Array.from({ length: total }).map((_, i) => {
          const acquired = i < clamped;
          return (
            <li key={i} className='flex items-center justify-center'>
              {acquired ? (
                <div
                  className='w-[3rem] h-[3rem] rounded-full 
                             flex items-center justify-center'
                  aria-label={`${i + 1}번째 스탬프 획득`}
                >
                  <Icon name='Stamp' size={28} color='pink-400' aria-hidden />
                </div>
              ) : (
                <div
                  className='w-[3rem] h-[3rem] rounded-full bg-pink-100'
                  aria-label={`${i + 1}번째 스탬프 미획득`}
                />
              )}
            </li>
          );
        })}
      </ul>

      <Progress value={percent} className='my-[0.6rem]' />
    </section>
  );
}

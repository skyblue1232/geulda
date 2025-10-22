'use client';

import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';

interface RecentLoginBubbleProps {
  className?: string;
}

const bubbleVariants = cva(
  'relative inline-flex justify-center items-center px-[0.8rem] py-[0.4rem] bg-pink-200 rounded-[2rem]',
);

const RecentLoginBubble = ({ className }: RecentLoginBubbleProps) => {
  return (
    <div className={cn(bubbleVariants(), className)}>
      <span className='text-label-sm text-white'>최근 로그인</span>
      {/* 말풍선 꼬리 */}
      <div
        className='
          absolute left-1/2 -bottom-[0.7rem] -translate-x-1/2
          w-[0.6rem] h-[0.8rem] bg-pink-200
          [clip-path:polygon(50%_100%,100%_0,0_0)]
        '
      />
    </div>
  );
};

export default RecentLoginBubble;

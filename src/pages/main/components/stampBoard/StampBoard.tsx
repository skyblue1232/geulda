import { cn } from '@/shared/lib';
import Progress from './Progress';
import Stamp from './Stamp';

export interface StampBoardProps {
  count: number;
  total?: number;
  className?: string;
}

const StampBoard = ({ count, total = 8, className }: StampBoardProps) => {
  const clamped = Math.max(0, Math.min(total, count));
  const percent = (clamped / total) * 100;

  return (
    <section
      className={cn(
        'w-full rounded-[32px]',
        'border border-pink-100 bg-pink-50',
        'flex flex-col gap-[0.4rem] px-[2.1rem] py-[1.3rem]',
        className,
      )}
      aria-label='스탬프 보드'
    >
      <header className='flex items-baseline justify-between text-body-md text-pink-500'>
        <span>스탬프 수집 현황</span>
        <span>
          {clamped}/{total}
        </span>
      </header>

      <ul
        role='list'
        className='grid'
        style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
        aria-label='스탬프 목록'
      >
        {Array.from({ length: total }).map((_, i) => {
          const key = `stamp-${i}`;
          return (
            <li key={key} className='flex items-center justify-center'>
              <Stamp index={i} acquired={i < clamped} />
            </li>
          );
        })}
      </ul>

      <Progress value={percent} className='my-[0.6rem]' />
    </section>
  );
};

export default StampBoard;

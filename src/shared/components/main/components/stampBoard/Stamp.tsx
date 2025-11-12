import { cn } from '@/shared/lib';
import { Icon } from '@/shared/icons';

export interface StampProps {
  index: number;
  acquired: boolean;
  className?: string;
}

const Stamp = ({ index, acquired, className }: StampProps) => {
  if (acquired) {
    return (
      <div
        role="img"
        aria-label={`${index + 1}번째 스탬프 ${acquired ? '획득' : '미획득'}`}
        className={cn(
          'flex items-center justify-center w-[2.8rem] h-[2.8rem]',
          className,
        )}
      >
        <Icon name='Stamp' size={28} color='pink-400' aria-hidden />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-full bg-pink-100 w-[2.8rem] h-[2.8rem]',
        className,
      )}
      aria-label={`${index + 1}번째 스탬프 획득`}
    />
  );
};
export default Stamp;

import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { cva } from 'class-variance-authority';

interface ControlBarProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  userName: string;
  className?: string;
}

const rightStyle = cva('flex items-center gap-[0.6rem] transition w-[7.8rem]', {
  variants: {
    state: {
      loggedIn: 'text-mint-600',
      guest: 'text-gray-400 hover:text-gray-600',
    },
  },
  defaultVariants: { state: 'guest' },
});

const ControlBar = ({
  onLogin,
  isLoggedIn,
  userName = '글다',
  className,
}: ControlBarProps) => {
  const rightState = isLoggedIn ? 'loggedIn' : ('guest' as const);
  const iconColor = isLoggedIn ? 'mint-600' : ('gray-400' as const);

  return (
    <header className={cn('bg-none w-full h-[5.4rem]', className)} role='group'>
      <div className='h-full grid grid-cols-[auto_1fr_auto] items-center gap-[1.2rem]'>
        <div
          className='w-[7.8rem] h-[5.4rem] rounded-[0.6rem] bg-gray-200'
          aria-hidden
        />

        <h1 className='justify-self-center text-headline-sm-serif font-[400] leading-[2.4rem] tracking-[0.015rem] text-gray-900'>
          글다
        </h1>
        {isLoggedIn ? (
          <div className={cn(rightStyle({ state: rightState }), 'min-w-0')}>
            <Icon name='User' size={24} color={iconColor} />
            <span
              className='text-body-md w-[5.3rem] truncate block'
              aria-label={`${userName}님`}
            >
              {userName}님
            </span>
          </div>
        ) : (
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onLogin?.();
            }}
            className={rightStyle({ state: rightState })}
            aria-label='Log In'
          >
            <Icon name='User' size={24} color={iconColor} />
            <span className='text-body-md'>Log In</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default ControlBar;

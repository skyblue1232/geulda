import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { cva } from 'class-variance-authority';

interface ControlBarProps {
  onLogin?: () => void;
  isLoggedIn: boolean;
  userName?: string;
  className?: string;
  disabled?: boolean;
}

const rightStyle = cva('flex items-center gap-[0.6rem] transition w-[7.8rem]', {
  variants: {
    state: {
      loggedIn: 'text-mint-600',
      guest: 'text-gray-400 hover:text-gray-600',
    },
    disabled: {
      true: 'opacity-60 pointer-events-none',
      false: '',
    },
  },
  defaultVariants: { state: 'guest', disabled: false },
});

const ControlBar = ({
  onLogin,
  isLoggedIn = false,
  userName = '홍길동님',
  className,
  disabled = false,
}: ControlBarProps) => {
  const rightState = isLoggedIn ? 'loggedIn' : ('guest' as const);
  const iconColor = isLoggedIn ? 'mint-600' : ('gray-400' as const);

  return (
    <section
      className={cn('bg-none w-full h-[5.4rem]', className)}
      aria-disabled={disabled}
      role='group'
    >
      <div className='h-full grid grid-cols-[auto_1fr_auto] items-center gap-[1.2rem]'>
        <div
          className='w-[7.8rem] h-[5.4rem] rounded-[0.6rem] bg-gray-200'
          aria-hidden
        />

        <h1 className='justify-self-center text-title-md font-[600] leading-[2.4rem] tracking-[0.015rem] text-gray-900'>
          글다
        </h1>

        {isLoggedIn ? (
          <div
            className={cn(
              rightStyle({ state: rightState, disabled }),
              'min-w-0',
            )}
          >
            <Icon name='User' size={24} color={iconColor} />
            <span
              className='text-body-md max-w-[7.8rem] truncate'
              title={`${userName}님`}
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
              {
                /*TODO: 로그인 페이지 이동 연결*/
              }
              if (!disabled) onLogin?.();
            }}
            className={rightStyle({ state: rightState, disabled })}
            aria-label='Log In'
          >
            <Icon name='User' size={24} color={iconColor} />
            <span className='text-body-md'>Log In</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default ControlBar;

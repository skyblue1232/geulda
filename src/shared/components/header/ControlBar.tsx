import { useRouter } from 'next/router';
import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { cva } from 'class-variance-authority';
import { useUserStatus } from '@/shared/hooks/header/useUserStatus';

interface ControlBarProps {
  className?: string;
}

const controlBarVariants = cva(
  'flex justify-between items-center h-full px-[1.6rem]',
);

const rightStyle = cva('flex items-center gap-[0.6rem] transition', {
  variants: {
    state: {
      loggedIn: 'text-mint-600',
      guest: 'text-gray-400 hover:text-gray-600',
    },
  },
  defaultVariants: { state: 'guest' },
});

const ControlBar = ({ className }: ControlBarProps) => {
  const router = useRouter();
  const { isLoggedIn, userName } = useUserStatus();

  const rightState = isLoggedIn ? 'loggedIn' : ('guest' as const);
  const iconColor = isLoggedIn ? 'mint-600' : ('gray-400' as const);
  const logoName = isLoggedIn ? 'LogoMint' : 'LogoPink';

  const handleLoginRedirect = () => router.push('/auth');

  return (
    <header className={cn(' w-full h-[5.4rem] bg-white', className)}>
      <div className={controlBarVariants()}>
        <Icon name={logoName} size={54} />

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
              handleLoginRedirect();
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

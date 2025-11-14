'use client';

import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { cva } from 'class-variance-authority';

interface ControlBarProps {
  className?: string;
  isLoggedIn: boolean | null;
  userName: string;
  isLoading: boolean;
  onClickLogo: () => void;
  onClickUser: () => void;
}

const controlBarVariants = cva('flex justify-between items-center h-full');
const rightStyle = cva('flex items-center gap-[0.6rem] transition', {
  variants: {
    state: {
      loggedIn: 'text-mint-600',
      guest: 'text-gray-400 hover:text-gray-600',
    },
  },
  defaultVariants: { state: 'guest' },
});

export default function ControlBar({
  className,
  isLoggedIn,
  userName,
  isLoading,
  onClickLogo,
  onClickUser,
}: ControlBarProps) {
  if (isLoading || isLoggedIn === null) {
    return (
      <header className={cn('w-full h-[5.4rem] bg-white', className)}>
        <div className={controlBarVariants()}>
          <Icon name="LogoPink" size={54} />
        </div>
      </header>
    );
  }

  const rightState = isLoggedIn ? 'loggedIn' : 'guest';
  const iconColor = isLoggedIn ? 'mint-600' : 'gray-400';
  const logoName = isLoggedIn ? 'LogoMint' : 'LogoPink';

  return (
    <header className={cn('w-full h-[5.4rem] bg-white', className)}>
      <div className={controlBarVariants()}>
        <button
          type="button"
          onClick={onClickLogo}
          aria-label="메인으로 이동"
          className="flex items-center"
        >
          <Icon name={logoName} size={54} />
        </button>

        <button
          type="button"
          onClick={onClickUser}
          className={cn(rightStyle({ state: rightState }), 'min-w-0')}
          aria-label={isLoggedIn ? `${userName}님의 마이페이지` : '로그인 페이지로 이동'}
        >
          <Icon name="User" size={24} color={iconColor} />
          <span className="text-body-md w-[5.3rem] truncate block">
            {isLoggedIn ? `${userName}님` : 'Log In'}
          </span>
        </button>
      </div>
    </header>
  );
}

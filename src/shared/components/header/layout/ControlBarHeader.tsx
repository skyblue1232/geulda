'use client';

import { useRouter } from 'next/navigation';
import { useUserStatus } from '@/shared/hooks/useUserStatus';
import ControlBar from '@/shared/components/header/ControlBar';

interface ControlBarHeaderProps {
  className?: string;
}

export default function ControlBarHeader ({ className }: ControlBarHeaderProps) {
  const router = useRouter();
  const { isLoggedIn, userName, isLoading } = useUserStatus();

  const handleLogoClick = () => {
    setTimeout(() => router.push('/main'), 500);
  };

  const handleUserClick = () => {
    setTimeout(() => {
      if (isLoggedIn) router.push('/mypage');
      else router.push('/auth');
    }, 500);
  };

  return (
    <ControlBar
      className={className}
      isLoggedIn={isLoggedIn}
      userName={userName}
      isLoading={isLoading}
      onClickLogo={handleLogoClick}
      onClickUser={handleUserClick}
    />
  );
}

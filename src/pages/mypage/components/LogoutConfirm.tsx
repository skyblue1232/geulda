'use client';

import { PopupSet } from '@/shared/components';
import { useRouter } from 'next/router';

interface LogoutConfirmProps {
  onClose: () => void;
}

export default function LogoutConfirm({ onClose }: LogoutConfirmProps) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    localStorage.removeItem('accessToken');
    router.push('/main'); 
  };

  return (
    <PopupSet
      text="로그아웃 하시겠습니까?"
      onClose={handleClose}
    />
  );
}

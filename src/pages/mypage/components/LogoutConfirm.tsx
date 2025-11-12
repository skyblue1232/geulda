'use client';

import { PopupSet } from '@/shared/components';
import { useRouter } from 'next/router';
import { apiWithToken } from '@/shared/api/instance';
import { getRefreshToken, clearTokens } from '@/shared/utils/token';
import { useQueryClient } from '@tanstack/react-query';

interface LogoutConfirmProps {
  onClose: () => void;
}

export default function LogoutConfirm({ onClose }: LogoutConfirmProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      const refreshToken = getRefreshToken();
      await apiWithToken.post('/api/auth/logout', { refreshToken });
      clearTokens();
      queryClient.clear();

      router.push('/main');

      router.reload();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      onClose();
    }
  };

  return <PopupSet text="로그아웃 하시겠습니까?" onClose={handleLogout} />;
}

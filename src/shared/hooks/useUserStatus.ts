'use client';

import { useEffect, useState } from 'react';
import { useMyPageQuery } from '@/shared/api/member';
import type { ApiResponse } from '@/shared/types/authtypes';

interface MyPageData {
  profile?: { name?: string };
  name?: string;
  memberName?: string;
}

export const useUserStatus = () => {
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    setToken(localStorage.getItem('accessToken'));
  }, []);

  const { data, isLoading, isError } = useMyPageQuery(isClient && !!token);

  if (!isClient) return { isLoggedIn: null, userName: 'Guest', isLoading: true };
  if (!token) return { isLoggedIn: false, userName: 'Guest', isLoading: false };
  if (isLoading) return { isLoggedIn: null, userName: 'Guest', isLoading: true };
  if (isError || !data) return { isLoggedIn: false, userName: 'Guest', isLoading: false };

  const res = data as ApiResponse<MyPageData>;
  const name = res.data?.profile?.name || res.data?.name || res.data?.memberName;
  const ok = (res.code === 'SUCCESS_READ' || res.code === 'S001') && !!name;

  return { isLoggedIn: ok, userName: ok ? name! : 'Guest', isLoading: false };
};

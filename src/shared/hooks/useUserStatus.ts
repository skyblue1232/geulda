'use client';

import { useEffect, useState } from 'react';
import { fetchMyPage } from '@/shared/api/member';
import type { ApiResponse } from '@/shared/types/authtypes';

interface MyPageData {
  profile?: { name?: string };
  name?: string;
  memberName?: string;
}

export const useUserStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string>('Guest');

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res: ApiResponse<MyPageData> = await fetchMyPage();
        console.log('유저 조회 응답:', res);

        const name =
          res.data?.profile?.name || res.data?.name || res.data?.memberName;

        if ((res.code === 'SUCCESS_READ' || res.code === 'S001') && name) {
          setUserName(name);
          setIsLoggedIn(true);
        } else {
          console.warn('유저 정보 응답 다릅니다.', res);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('유저 정보를 불러오지 못했습니다.', error);
        setIsLoggedIn(false);
      }
    };

    loadUser();
  }, []);

  return { isLoggedIn, userName };
};

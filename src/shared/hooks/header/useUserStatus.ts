'use client';

import { useEffect, useState } from 'react';
import { fetchMyPage } from '@/shared/api/member';

export const useUserStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>('Guest');

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setIsLoggedIn(false);
          setUserName('Guest');
          return;
        }

        const data = await fetchMyPage();

        if (data?.profile?.name) {
          setIsLoggedIn(true);
          setUserName(data.profile.name);
        } else {
          setIsLoggedIn(false);
          setUserName('Guest');
        }
      } catch {
        setIsLoggedIn(false);
        setUserName('Guest');
      }
    };

    checkLogin();
  }, []);

  return { isLoggedIn, userName };
};

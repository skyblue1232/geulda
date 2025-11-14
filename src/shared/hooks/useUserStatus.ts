'use client';

import { useEffect, useState } from 'react';
import { getAccessToken } from '@/shared/utils/token';
import { apiWithToken } from '@/shared/api/instance';

export const useUserStatus = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userName, setUserName] = useState('Guest');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = getAccessToken();

    if (token) {
      setIsLoggedIn(true);
      setIsLoading(true);

      const cachedName = localStorage.getItem('userName');
      if (cachedName) setUserName(cachedName);
      apiWithToken
        .get('/api/members/me')
        .then((res) => {
          const { code, data } = res.data || {};
          if ((code === 'SUCCESS_READ' || code === 'S001') && data?.name) {
            setUserName(data.name);
            localStorage.setItem('userName', data.name);
          } else {
            setIsLoggedIn(false);
            setUserName('Guest');
          }
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUserName('Guest');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setUserName('Guest');
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = getAccessToken();
      if (!token) {
        setIsLoggedIn(false);
        setUserName('Guest');
      } else {
        setIsLoggedIn(true);
        const cachedName = localStorage.getItem('userName');
        if (cachedName) setUserName(cachedName);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { isLoggedIn, userName, isClient, isLoading };
};

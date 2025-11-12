'use client';

import { useEffect, useState } from 'react';
import { getAccessToken } from '@/shared/utils/token';

export const useUserStatus = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    setIsClient(true);
    const token = getAccessToken();

    if (token) {
      setIsLoggedIn(true);
      const cachedName = localStorage.getItem('userName');
      if (cachedName) setUserName(cachedName);
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

  return { isLoggedIn, userName, isClient };
};
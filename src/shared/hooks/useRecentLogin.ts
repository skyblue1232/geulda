'use client';
import { useEffect, useState } from 'react';

const RECENT_LOGIN_KEY = 'recentLoginPlatform';

export function useRecentLogin() {
  const [recentPlatform, setRecentPlatform] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(RECENT_LOGIN_KEY);
    if (saved) setRecentPlatform(saved);
  }, []);

  const saveRecentPlatform = (platform: string) => {
    localStorage.setItem(RECENT_LOGIN_KEY, platform);
    setRecentPlatform(platform);
  };

  return { recentPlatform, saveRecentPlatform };
}

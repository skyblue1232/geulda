'use client';

import { useState } from 'react';
import { postBookmark, deleteBookmark } from '@/shared/api/events/event';
import { getAccessToken } from '@/shared/utils/token';

export const useBookmark = (eventId: number) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [requireLogin, setRequireLogin] = useState(false);

  const toggleBookmark = async () => {
    const token = getAccessToken();

    if (!token) {
      setRequireLogin(true);
      return;
    }

    try {
      if (isBookmarked) {
        await deleteBookmark(eventId);
      } else {
        await postBookmark(eventId);
      }
      setIsBookmarked((prev) => !prev);
    } catch (err) {
      console.error('북마크 토글 실패:', err);
    }
  };

  return { isBookmarked, setIsBookmarked, toggleBookmark, requireLogin, setRequireLogin };
};

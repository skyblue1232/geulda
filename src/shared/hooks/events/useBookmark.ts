'use client';

import { useState, useEffect  } from 'react';
import { postBookmark, deleteBookmark, fetchBookmarkStatus  } from '@/shared/api/events/event';
import { getAccessToken } from '@/shared/utils/token';

export const useBookmark = (eventId: number) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [requireLogin, setRequireLogin] = useState(false);

   useEffect(() => {
    const loadStatus = async () => {
      const token = getAccessToken();
      if (!token) return;

      try {
        const res = await fetchBookmarkStatus(eventId);
        setIsBookmarked(res.data.isBookmarked);
      } catch (err) {
        console.error('북마크 상태 조회 실패:', err);
      }
    };

    if (eventId) loadStatus();
  }, [eventId]);

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

'use client';

import { useState, useEffect } from 'react';
import {
  postBookmark,
  deleteBookmark,
  fetchBookmarkStatus,
} from '@/shared/api/events/event';

export const useBookmark = (eventId: number) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const loadBookmarkStatus = async () => {
      try {
        const res = await fetchBookmarkStatus(eventId);
        setIsBookmarked(res.data.isBookmarked);
      } catch (err) {
        console.error('북마크 상태 조회 실패:', err);
      }
    };
    if (eventId) loadBookmarkStatus();
  }, [eventId]);

  const toggleBookmark = async () => {
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

  return { isBookmarked, toggleBookmark };
};

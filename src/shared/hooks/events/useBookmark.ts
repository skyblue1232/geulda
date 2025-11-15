'use client';

import { useState, useEffect } from 'react';
import { postBookmark, deleteBookmark } from '@/shared/api/events/event';
import { getAccessToken } from '@/shared/utils/token';
import { useQueryClient } from '@tanstack/react-query';

export const useBookmark = (eventId: number, initialState: boolean) => {
  const [isBookmarked, setIsBookmarked] = useState(initialState);
  const [requireLogin, setRequireLogin] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsBookmarked(initialState);
  }, [initialState]);

  const toggleBookmark = async () => {
    const token = getAccessToken();
    if (!token) {
      setRequireLogin(true);
      return;
    }

    try {
      setIsBookmarked((prev) => !prev);
      if (isBookmarked) {
        await deleteBookmark(eventId);
      } else {
        await postBookmark(eventId);
      }


      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['eventDetail', eventId] });
      queryClient.invalidateQueries({ queryKey: ['myPage'] });
      await queryClient.refetchQueries({ queryKey: ['myPage'] });
    } catch (err) {
     console.error('북마크 토글 실패:', err);
    setIsBookmarked((prev) => !prev); 
     }
  };

  return {  isBookmarked,
    setIsBookmarked,
    toggleBookmark,
    requireLogin,
    setRequireLogin,};
};

import { useState, useCallback } from 'react';

export const useCardFlip = (initialState = false) => {
  const [isFlipped, setIsFlipped] = useState(initialState);

  // 클릭 시 뒤집기
  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // 마우스 호버 시
  const handleMouseEnter = useCallback(() => {
    setIsFlipped(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsFlipped(false);
  }, []);

  return { isFlipped, handleFlip, handleMouseEnter, handleMouseLeave };
};

import { useState } from 'react';

export function useCourseSelection() {
  const [purpose, setPurpose] = useState<string | null>(null);
  const [stay, setStay] = useState<string | null>(null);
  const [move, setMove] = useState<string | null>(null);

  return {
    purpose,
    setPurpose,
    stay,
    setStay,
    move,
    setMove,
  };
}

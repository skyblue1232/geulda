'use client';
import { useEffect, useRef, useState } from 'react';

interface UseChattingInputProps {
  onSend?: (text: string) => void;
}

export const useChattingInput = ({ onSend }: UseChattingInputProps) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // focus 시 스크롤 중앙으로
  useEffect(() => {
    const handleFocus = () => {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 200);
    };
    const el = inputRef.current;
    el?.addEventListener('focus', handleFocus);
    return () => el?.removeEventListener('focus', handleFocus);
  }, []);

  // 메시지 전송
  const handleSubmit = () => {
    if (!message.trim()) return;
    onSend?.(message);
    setMessage('');
  };

  // 엔터키 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return {
    message,
    setMessage,
    inputRef,
    handleSubmit,
    handleKeyDown,
  };
};

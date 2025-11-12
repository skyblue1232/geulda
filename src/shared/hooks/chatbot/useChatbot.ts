'use client';

import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createChatSession, fetchChatResponse } from '@/shared/api/chatbot/chatbot';

const SESSION_KEY = 'chatbot:sessionId';

export const useChatbot = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    const bootstrap = async () => {
      try {
        const cached = typeof window !== 'undefined' ? localStorage.getItem(SESSION_KEY) : null;
        if (cached) {
          setSessionId(cached);
          return;
        }
        const id = await createChatSession();
        setSessionId(id);
        if (typeof window !== 'undefined') localStorage.setItem(SESSION_KEY, id);
      } catch (e) {
        console.error('세션 생성 실패:', e);
        setSessionId(null);
      }
    };

    bootstrap();
  }, []);

  const mutation = useMutation({
    mutationFn: async (body: { message: string }) => {
      if (!sessionId) throw new Error('세션이 아직 준비되지 않았습니다.');
      return await fetchChatResponse(body.message, sessionId);
    },
  });

  return { ...mutation, sessionId };
};

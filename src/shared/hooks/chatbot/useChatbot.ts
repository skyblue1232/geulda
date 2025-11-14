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

   /** 메시지 전송 */
  const mutation = useMutation({
    mutationFn: async (body: { message: string }) => {
      if (!sessionId) throw new Error('세션이 아직 준비되지 않았습니다.');

      try {
        // 기존 세션으로 보내기
        return await fetchChatResponse(body.message, sessionId);
      } catch (err: any) {
        // 🔥 세션 만료 처리
        if (err.message === 'SESSION_EXPIRED') {
          console.warn('세션 만료됨 → 새 세션 생성 후 재시도');

          // 1) 새 세션 만들기
          const newId = await createChatSession();
          setSessionId(newId);
          localStorage.setItem(SESSION_KEY, newId);

          // 2) 새 세션으로 다시 요청
          return await fetchChatResponse(body.message, newId);
        }

        throw err;
      }
    },
  });

  return { ...mutation, sessionId };
};
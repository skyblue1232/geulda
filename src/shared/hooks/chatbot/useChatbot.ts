'use client';

import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createChatSession, fetchChatResponse } from '@/shared/api/chatbot/chatbot';
import { getMemberIdFromToken } from '@/shared/utils/token';

const SESSION_KEY = 'chatbot:sessionId';
const HISTORY_EXPIRE_HOURS = 24;

type UIMessage = {
  role: 'user' | 'assistant';
  message: string;
  timestamp: number;
};

export const useChatbot = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const inited = useRef(false);

  const memberId = getMemberIdFromToken();
  const isLoggedIn = !!memberId;

  const HISTORY_KEY = memberId ? `chatbot:history:${memberId}` : null;

  /** 만료 여부 */
  const isExpired = (timestamp: number) => {
    const now = Date.now();
    const diffHours = (now - timestamp) / (1000 * 3600);
    return diffHours >= HISTORY_EXPIRE_HOURS;
  };

  /** 히스토리 로드 */
  const loadHistory = () => {
    if (!HISTORY_KEY) return [];

    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (isExpired(parsed.updatedAt)) {
      localStorage.removeItem(HISTORY_KEY);
      return [];
    }

    return parsed.messages ?? [];
  };

  /** 히스토리 저장 */
  const saveHistory = (items: UIMessage[]) => {
    if (!HISTORY_KEY) return;

    const data = {
      updatedAt: Date.now(),
      messages: items.slice(-10),
    };

    localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
  };

  /** 초기 세팅: 세션 + 히스토리 */
  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    // 히스토리 로드 (로그인 유저만)
    if (isLoggedIn) {
      const prev = loadHistory();
      setMessages(prev);
    }

    const bootstrap = async () => {
      try {
        const cached = localStorage.getItem(SESSION_KEY);

        if (cached) {
          setSessionId(cached);
          return;
        }

        const id = await createChatSession();
        setSessionId(id);
        localStorage.setItem(SESSION_KEY, id);
      } catch (e) {
        console.error('세션 생성 실패:', e);
        setSessionId(null);
      }
    };

    bootstrap();
  }, []);

  /** 메시지 전송  */
  const mutation = useMutation({
    mutationFn: async (body: { message: string }) => {
      if (!sessionId) throw new Error('세션 준비 중');

      try {
        return await fetchChatResponse(body.message, sessionId);
      } catch (err: any) {
        if (err.message === 'SESSION_EXPIRED') {
          const newId = await createChatSession();
          setSessionId(newId);
          localStorage.setItem(SESSION_KEY, newId);

          return await fetchChatResponse(body.message, newId);
        }
        throw err;
      }
    },
  });

  /** UI 메시지 추가 + 저장 */
  const addMessage = (msg: UIMessage) => {
    setMessages(prev => {
      const updated = [...prev, msg];

      if (isLoggedIn) saveHistory(updated);

      return updated;
    });
  };

  return {
    ...mutation,
    sessionId,
    messages,
    addMessage,
  };
};

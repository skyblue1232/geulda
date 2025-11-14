'use client';

import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  createChatSession,
  fetchChatResponse,
} from '@/shared/api/chatbot/chatbot';
import { getMemberIdFromToken } from '@/shared/utils/token';

const SESSION_KEY = 'chatbot:sessionId';
const HISTORY_EXPIRE_HOURS = 10;

type UIMessage = {
  role: 'user' | 'assistant';
  message: string;
  timestamp: number;
};

type HistoryData = {
  updatedAt: number;
  messages: UIMessage[];
};

export const useChatbot = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const inited = useRef(false);

  const memberId = getMemberIdFromToken();
  const isLoggedIn = !!memberId;
  const HISTORY_KEY = memberId ? `chatbot:history:${memberId}` : null;

  /* 만료 여부 */
  const isExpired = (timestamp: number) => {
    const now = Date.now();
    const diffHours = (now - timestamp) / (1000 * 3600);
    return diffHours >= HISTORY_EXPIRE_HOURS;
  };

  /* 세션 + 히스토리 */
  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    /* 히스토리 로드 */
    const loadHistory = (): UIMessage[] => {
      if (!HISTORY_KEY) return [];
      if (typeof window === 'undefined') return [];

      const raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) return [];

      try {
        const parsed: HistoryData = JSON.parse(raw);

        if (isExpired(parsed.updatedAt)) {
          localStorage.removeItem(HISTORY_KEY);
          return [];
        }

        return parsed.messages ?? [];
      } catch (err) {
        console.error('히스토리 파싱 실패:', err);
        localStorage.removeItem(HISTORY_KEY);
        return [];
      }
    };

    /* 부트 스트랩*/
    const bootstrapSession = async () => {
      try {
        const cached = localStorage.getItem(SESSION_KEY);

        if (cached) {
          setSessionId(cached);
          return;
        }

        const id = await createChatSession();
        setSessionId(id);
        localStorage.setItem(SESSION_KEY, id);
      } catch (error) {
        console.error('세션 생성 실패:', error);
        setSessionId(null);
      }
    };

    // 히스토리 로드 (로그인 유저만)
    if (isLoggedIn) {
      const prev = loadHistory();
      setMessages(prev);
    }

    bootstrapSession();
  }, [HISTORY_KEY, isLoggedIn]);

  /** 메시지 저장 */
  const saveHistory = (items: UIMessage[]) => {
    if (!HISTORY_KEY) return;

    const data: HistoryData = {
      updatedAt: Date.now(),
      messages: items.slice(-10),
    };

    localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
  };

  /** 메시지 전송 */
  const mutation = useMutation({
    mutationFn: async (body: { message: string }) => {
      if (!sessionId) throw new Error('세션 준비 중');

      try {
        return await fetchChatResponse(body.message, sessionId);
      } catch (error: unknown) {
        if (error instanceof Error && error.message === 'SESSION_EXPIRED') {
          try {
            // 새 세션 만들기
            const newId = await createChatSession();
            setSessionId(newId);
            if (typeof window !== 'undefined') {
              localStorage.setItem(SESSION_KEY, newId);
            }

            // 새 세션으로 다시 요청
            return await fetchChatResponse(body.message, newId);
          } catch (retryErr) {
            console.error('재시도 중 오류:', retryErr);
            throw new Error('세션 재생성 실패. 나중에 다시 시도해주세요.');
          }
        }
        throw error;
      }
    },
  });

  /** UI 메시지 추가 */
  const addMessage = (msg: UIMessage) => {
    setMessages((prev) => {
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

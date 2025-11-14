import axios from 'axios';

type SessionSuccess = {
  code: string;
  message: string;
  isSuccess: boolean;
  result?: { sessionId?: string; expiresAt?: string };
  data?: { sessionId?: string; expiresAt?: string };
  sessionId?: string;
};

type ChatSuccess = {
  code: string;
  message: string;
  isSuccess: boolean;
  result?: { message?: string };
  data?: { message?: string };
  answer?: string;
    errorCode?: string;
};

const getBaseUrl = () => {
  const raw = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!raw) throw new Error('ENV NEXT_PUBLIC_BACKEND_URL is not set');
  return raw.replace(/\/+$/, '');
};

/** 세션 생성 */
export const createChatSession = async (): Promise<string> => {
  const BASE = getBaseUrl();
  const url = `${BASE}/api/chatbot/sessions`;

  const res = await axios.post<SessionSuccess>(
    url,
    {},
    {
      headers: { 'Content-Type': 'application/json' },
      validateStatus: () => true,
    },
  );

  if (res.status >= 400) {
    console.error('세션 생성 실패:', res.status, res.data);
    throw new Error(`세션 생성 실패: ${res.status}`);
  }

  const d = res.data;
  const sessionId =
    d?.result?.sessionId ?? d?.data?.sessionId ?? d?.sessionId ?? null;

  if (!sessionId) {
    console.error('예상치 못한 세션 생성 응답 형식:', d);
    throw new Error('유효하지 않은 세션 응답: sessionId가 없습니다.');
  }

  return sessionId;
};

/** 메시지 전송 */
export const fetchChatResponse = async (
  message: string,
  sessionId: string,
): Promise<string> => {
  const BASE = getBaseUrl();
  const url = `${BASE}/api/chatbot/chat`;

  const res = await axios.post<ChatSuccess>(
    url,
    { message },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Chat-Session': sessionId,
      },
      validateStatus: () => true,
    },
  );

   if (res.status === 404 && res.data?.errorCode === 'E602') {
    localStorage.removeItem('chatbot:sessionId');
    throw new Error('SESSION_EXPIRED');
  }


  if (res.status >= 400) {
    console.error('챗봇 응답 실패:', res.status, res.data);
    throw new Error(`챗봇 응답 실패: ${res.status}`);
  }

  const d = res.data;
  const answer = d?.result?.message ?? d?.data?.message ?? d?.answer ?? null;

  if (!answer) {
    console.error('예상치 못한 챗봇 응답 형식:', d);
    throw new Error('유효하지 않은 챗봇 응답: message가 없습니다.');
  }

  return answer;
};

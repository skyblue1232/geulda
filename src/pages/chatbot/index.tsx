'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import { Header } from '@/shared/components';
import { useChatbot } from '@/shared/hooks/chatbot/useChatbot';
import Chatting from '@/pages/chatbot/components/ChattingBubble';
import ChattingInput from '@/pages/chatbot/components/ChattingInput';

const chatPageStyle = cva(
  'relative w-full h-dvh overflow-hidden bg-white flex flex-col',
);

const mainStyle = cva(
  'relative w-full flex-1 pt-[14.4rem] pb-[10rem] px-[2.4rem] overflow-auto flex flex-col gap-[0.6rem]',
);

const introStyle = cva('flex flex-col items-start gap-[1rem]');

type Message = {
  id: number;
  text: string;
  variant: 'received' | 'sent';
};

export default function ChatPage() {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: sendChat, sessionId } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    if (!sessionId) {
      return;
    }

    const userMsg: Message = { id: Date.now(), text, variant: 'sent' };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const answer = await sendChat({ message: text });
      const botMsg: Message = {
        id: Date.now() + 1,
        text: answer,
        variant: 'received',
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('챗봇 응답 실패:', err);
    }
  };

  return (
    <div className={cn(chatPageStyle())}>
      {/* 헤더 고정 */}
      <div className='fixed top-0 left-0 w-full z-10'>
        <Header title='ChatBot' onClick={() => router.back()} />
      </div>

      {/* 메인 콘텐츠 */}
      <main
        role='log'
        aria-label='채팅 내용'
        aria-live='polite'
        className={cn(mainStyle())}
      >
        {/* 로고 + 기본 멘트 */}
        <div className={cn(introStyle())}>
          {/* 로고 자리 (임시) */}
          <Image
            src='/assets/chatbot.svg'
            alt='챗봇 프로필 아이콘'
            width={60}
            height={60}
            className='rounded-full flex-shrink-0'
            priority
          />
          <Chatting
            message='안녕하세요, 글다에요! 부천시 여행에 대한 정보를 쉽게 알려드릴게요.'
            variant='received'
            aria-label='글다의 메시지: 안녕하세요, 글다에요! 부천시 여행에 대한 정보를 쉽게 알려드릴게요.'
          />
          <Chatting
            message='원하시는 정보를 물어봐주세요!'
            variant='received'
          />
        </div>

        {/* 사용자 메시지 */}
        {messages.map((m) => (
          <Chatting key={m.id} message={m.text} variant={m.variant} />
        ))}

        {/* 스크롤 */}
        <div ref={bottomRef} aria-hidden='true' />
      </main>

      {/* 입력창 */}
      <ChattingInput onSend={handleSend} disabled={!sessionId} />
    </div>
  );
}

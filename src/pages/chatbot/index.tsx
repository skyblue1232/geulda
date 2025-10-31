'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/shared/components';
import Chatting from '@/pages/chatbot/components/ChattingBubble';
import ChattingInput from '@/pages/chatbot/components/ChattingInput';

export default function ChatPage() {
  const router = useRouter();

  type Message = {
    id: number;
    text: string;
    variant: 'received' | 'sent';
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '안녕하세요, 글다에요! 부천시 여행에 대한 정보를 쉽게 알려드릴게요.',
      variant: 'received',
    },
    { id: 2, text: '원하시는 정보를 물어봐주세요!', variant: 'received' },
  ]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg = { id: Date.now(), text, variant: 'sent' as const };
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <div className='relative w-full h-[100vh] overflow-hidden bg-white'>
      {/* 상단 헤더 */}
      <Header title='ChatBot' onClick={() => router.back()} />

      {/* 메인 콘텐츠 */}
      <main className='flex flex-col justify-between w-full h-full mt-[1.4rem]'>
        {/* 메시지 목록 */}
        <section className='flex-1 overflow-y-auto px-[2.4rem] pt-[1.6rem] pb-[8rem] flex flex-col gap-[1.2rem] bg-white'>
          <div className='flex items-start gap-[1.4rem]'>
            <div className='w-[4rem] h-[4rem] rounded-full bg-gray-200 flex-shrink-0' />
            <div className='flex flex-col gap-[0.8rem]'>
              <Chatting message='안녕하세요, 글다에요!\n부천시 여행에 대한 정보를 쉽게 알려드릴게요.' variant='received' />
              <Chatting message='원하시는 정보를 물어봐주세요!' variant='received' />
            </div>
          </div>

          {messages
            .filter((msg) => msg.id > 2)
            .map((msg) => (
              <Chatting key={msg.id} message={msg.text} variant={msg.variant} />
            ))}
        </section>

        {/* 하단 입력창 */}
        <ChattingInput onSend={handleSendMessage} />
      </main>
    </div>
  );
}

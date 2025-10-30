'use client';

import { useState } from 'react';
import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { ControlBar, DatePicker } from '@/shared/components';
import { BottomNav } from '@/shared/components/tab/BottomNav';

export default function EventPage() {
  const [date, setDate] = useState<Date>();

  return (
    <div
      className={cn(
        'px-[2.4rem] bg-white flex flex-col gap-[1rem] h-full pt-[1.3rem] pb-[12rem]',
      )}
    >
      {/* 상단 고정 헤더 */}
      <ControlBar
        isLoggedIn={true}
        userName='홍길동'
        onLogin={() => {}}
        className='fixed top-[1rem] left-0 right-0 z-50 px-[2rem]'
      />

      {/* 본문 콘텐츠 */}
      <main className='w-full pt-[6.3rem] flex flex-col items-center'>
        {/* 날짜 선택 */}
        <div className='w-full mt-[3.7rem] flex justify-start'>
          <DatePicker value={date} onChange={setDate} />
        </div>

        {/* 행사 없음 */}
        <div className='flex flex-col items-center justify-center text-center mt-[15rem]'>
          <Icon name='Stamp' size={120} color='gray-200' />
          <h2 className='text-headline-lg-serif text-gray-700 mt-[5rem]'>
            Ooops!
          </h2>
          <p className='text-label-serif  text-gray-500 mt-[2.4rem]'>
            선택하신 날은
            <br />
            행사가 없어요!
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import {
  ControlBar,
  DatePicker,
  BottomNav,
  EventCard,
} from '@/shared/components';
import { useEvents } from '@/shared/hooks/events/useEvents';
import type { EventData } from '@/shared/types/eventtypes';

export default function EventPage() {
  const router = useRouter();
  const { date: dateQuery } = router.query;
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { events } = useEvents(date);

  const filteredEvents = events;
  useEffect(() => {
    if (router.isReady && dateQuery) {
      setDate(new Date(String(dateQuery)));
    }
  }, [router.isReady, dateQuery]);

  const selectedDateString = date ? date.toISOString().split('T')[0] : '';

  return (
    <div
      className={cn(
        'px-[2.4rem] bg-white flex flex-col gap-[1rem] h-full pt-[1.3rem] overflow-hidden',
      )}
    >
      {/* 헤더 */}
      <ControlBar className='fixed top-[1rem] left-0 right-0 z-50 px-[2rem]' />

      {/* 본문 콘텐츠 */}
      <main className='w-full pt-[6.3rem] flex flex-col items-center'>
        {/* 날짜 선택 */}
        <div className='w-full mt-[3.7rem] flex justify-start'>
          {/* 스크린리더가 “날짜 선택”으로 읽히도록 추가 */}
          <label htmlFor='event-date' className='sr-only'>
            행사 날짜 선택
          </label>
          <DatePicker
            ariaLabel='행사 날짜 선택'
            value={date}
            onChange={setDate}
          />
        </div>

        {/* 행사카드 & 빈화면 */}
        {filteredEvents.length > 0 ? (
          <section
            aria-label='이벤트 목록'
            className={cn(
              'grid w-full mt-[1.4rem]',
              'grid-cols-2 gap-x-[1.4rem] gap-y-[1.4rem]',
            )}
          >
            {filteredEvents.map((event: EventData) => (
              <div
                key={event.id}
                onClick={() =>
                  router.push(`/events/${event.id}?date=${selectedDateString}`)
                }
                className='cursor-pointer'
              >
                <EventCard
                  eventId={event.id}
                  name={event.name}
                  address={event.address}
                  description={event.description}
                  variant='gray'
                  size='medium'
                  imageSrc={event.imageSrc}
                  liked={event.liked}
                />
              </div>
            ))}
          </section>
        ) : (
          <div
            className='flex flex-col items-center justify-center text-center mt-[15rem]'
            role='status'
            aria-live='polite'
          >
            <Icon name='Stamp' size={120} color='gray-200' />
            <h2 className='text-headline-lg-serif text-gray-700 mt-[5rem]'>
              Ooops!
            </h2>
            <p className='text-label-serif text-gray-500 mt-[2.4rem]'>
              선택하신 날은
              <br />
              행사가 없어요!
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

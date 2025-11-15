'use client';

import { useEffect } from 'react';
import { Header, EventCard } from '@/shared/components';
import DateTag from '@/pages/events/components/DateTag';
import { cn } from '@/shared/lib';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEventDetail } from '@/shared/hooks/events/useEventDetail';
import { buildNextEventList } from '@/shared/utils/buildNextEventList';
import type { RelatedEventOrEmpty } from '@/shared/types/eventtypes';

const isEmptyItem = (item: RelatedEventOrEmpty): item is { isEmpty: true } =>
  'isEmpty' in item;

const EventDetailPage = () => {
  const router = useRouter();
  const { id, date } = router.query;

  const eventId = Number(id);
  const { data: eventDetail, isLoading, isError } = useEventDetail(eventId);

  useEffect(() => {
    if (!isLoading && (isError || !eventDetail)) {
      router.replace('/events');
    }
  }, [isLoading, isError, eventDetail, router]);

  if (!eventId) return null;
  if (isError || !eventDetail) return null;
  if (!router.isReady) return null;

  const { title, body, address, startDate, endDate, imageUrl, nextEvents } =
    eventDetail;

  const nextList = buildNextEventList(nextEvents);

  return (
    <div className={cn('relative w-full min-h-[100vh] overflow-auto')}>
      <Header
        title='행사명'
        onClick={() => router.push(`/events${date ? `?date=${date}` : ''}`)}
        className={cn('fixed top-0 left-0 right-0 z-50')}
      />

      <main
        className={cn(
          'flex flex-col items-center justify-start',
          'px-[2.4rem] pt-[calc(10rem+1.4rem)]',
        )}
      >
        {/* 행사 기간 */}
        <div
          aria-label='행사 기간'
          className={cn('flex justify-center w-[18.4rem] mt-[1.3rem]')}
        >
          <DateTag startDate={startDate} endDate={endDate} />
        </div>

        {/* 대표 이미지 */}
        <section
          aria-label='행사 대표 이미지'
          className={cn(
            'relative w-full flex justify-center max-w-[35.4rem]  h-[43rem]',
            'mt-[1rem]',
          )}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${title} 이미지`}
              fill
              className={cn('object-cover rounded-[2rem]')}
            />
          ) : (
            <div
              className={cn('w-full h-full bg-gray-200 rounded-[2rem]')}
              role='img'
              aria-label={`${title} 이미지가 제공되지 않습니다.`}
            />
          )}
        </section>

        {/* 행사 카드 */}
        <div
          aria-label='행사 정보'
          className={cn(
            'flex flex-col items-center w-full gap-[0.8rem]',
            'mt-[0.8rem]',
          )}
        >
          <EventCard
            eventId={eventId}
            name={title}
            address={address ?? ''}
            description={body ?? ''}
            variant='gray'
            size='large'
            imageSrc={imageUrl ?? ''}
            liked={eventDetail.isBookmarked ?? false}
            hideLike={true}  
          />
          {/* 관련 행사 */}
          <div
            aria-label='관련 행사 목록'
            className={cn(
              'grid grid-cols-2 gap-[1.2rem] justify-items-center w-full max-w-[35.4rem]',
            )}
          >
            {nextList.map((item: RelatedEventOrEmpty, idx) => (
              <div key={idx} className={cn('w-[17rem]')}>
                {isEmptyItem(item) ? (
                  <EventCard
                    eventId={0}
                    name='행사 없음'
                    address=''
                    description=''
                    imageSrc=''
                    variant='gray'
                    size='small'
                    liked={false}
                    onClick={() => null}
                  />
                ) : (
                  <EventCard
                    eventId={item.eventId}
                    name={item.title}
                    address=''
                    description=''
                    imageSrc={item.imageUrl}
                    variant='gray'
                    size='small'
                    liked={false}
                    onClick={() => router.push(`/events/${item.eventId}`)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetailPage;

import { useEffect } from 'react';
import { Header, EventCard, AddressCopy } from '@/shared/components';
import DateTag from '@/pages/events/components/DateTag';
import { cn } from '@/shared/lib';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEventDetail } from '@/shared/hooks/events/useEventDetail';

const EventSavePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const eventId = Number(id);
  const { data: eventDetail, isLoading, isError } = useEventDetail(eventId);

  useEffect(() => {
    if (!isLoading && (isError || !eventDetail)) {
      router.replace('/mypage');
    }
  }, [isLoading, isError, eventDetail, router]);

  if (!eventId) return null;
  if (isError || !eventDetail) return null;

  const { title, body, address, startDate, endDate, imageUrl } = eventDetail;

  return (
    <div className={cn('relative w-full min-h-[100vh] overflow-auto')}>
      <Header
        title='저장한 행사'
        onClick={() => router.back()}
        className={cn('fixed top-0 left-0 right-0 z-50')}
      />

      <main
        role='main'
        aria-label='저장한 행사 상세 페이지'
        className={cn(
          'flex flex-col items-center justify-start',
          'px-[2.4rem] pt-[calc(10rem+1.4rem)]',
        )}
      >
        {/* 행사 기간 */}
        <div className={cn('flex justify-center w-[18.4rem] mt-[1.3rem]')}>
          <DateTag startDate={startDate} endDate={endDate} />
        </div>

        {/* 대표 이미지 */}
        <section
          className={cn(
            'relative w-full flex justify-center max-w-[35.4rem] h-[43rem]',
            'mt-[1rem]',
          )}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${title} 이미지`}
              fill
              className='object-cover rounded-[2rem]'
            />
          ) : (
            <div
              className='w-full h-full bg-gray-200 rounded-[2rem]'
              role='img'
              aria-label={`${title} 이미지가 제공되지 않습니다.`}
            />
          )}
        </section>

        {/* 행사 카드 */}
        <div
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
            liked={eventDetail.isBookmarked ?? true}
          />
          {/* 주소복사 */}
          <AddressCopy variant='gray' value={address ?? ''} />
        </div>
      </main>
    </div>
  );
};

export default EventSavePage;

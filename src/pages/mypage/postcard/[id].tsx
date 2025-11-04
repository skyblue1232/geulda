import { Header, EventCard } from '@/shared/components';
import { cn } from '@/shared/lib';
import { eventData } from '@/shared/constants/events/eventsData';
import Image from 'next/image';
import { useRouter } from 'next/router';

const PostCardSavePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const event = eventData.find((e) => e.id === Number(id));
  if (!event) return null;

  const { name, address, description, imageSrc } = event;

  return (
    <div className={cn('relative w-full min-h-[100vh] overflow-auto')}>
      <Header
        title='저장한 엽서'
        onClick={() => router.back()}
        className={cn('fixed top-0 left-0 right-0 z-50')}
      />

      <main
        className={cn(
          'flex flex-col items-center justify-start',
          'px-[2.4rem] pt-[25.8rem]',
        )}
      >
        {/* 카드 플립 자리 */}
        <section
          className={cn(
            'relative w-full flex justify-center max-w-[35.4rem]',
            'overflow-hidden rounded-[2rem]',
          )}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={`${name} 이미지`}
              width={354}
              height={220}
              className='object-cover w-full h-auto rounded-[2rem]'
            />
          ) : (
            <div className='w-full h-[22rem] bg-gray-200 rounded-[2rem]' />
          )}
        </section>

        {/* 행사 카드 */}
        <div
          className={cn(
            'flex flex-col items-center w-full gap-[0.8rem]',
            'mt-[8.7rem]',
          )}
        >
          <EventCard
            name={name}
            address={address}
            description={description}
            variant='gray'
            size='large'
          />
        </div>
      </main>
    </div>
  );
};

export default PostCardSavePage;

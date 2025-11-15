'use client';
import { Header, FlipCard, LocationCard } from '@/shared/components';
import { useImageOrientation } from '@/shared/hooks/useImageOrientation';
import { cn } from '@/shared/lib';
import { useRouter } from 'next/router';
import { useGetPostCardDetail } from '@/shared/api/member';
const PostCard = () => {
  const router = useRouter();
  const { id } = router.query;

  const postcardId = Number(id);
  const { data, isLoading, isError } = useGetPostCardDetail(postcardId);

  const imageUrl = data?.data?.imageUrl ?? '/assets/letter_card_backh.png';
  const { orientation } = useImageOrientation(imageUrl);

  if (isLoading)
    return (
      <div className='flex items-center justify-center h-screen text-gray-500'>
        엽서 정보를 불러오는 중입니다...
      </div>
    );

  if (isError || !data)
    return (
      <div className='flex items-center justify-center h-screen text-red-500'>
        데이터를 불러오지 못했습니다 😢
      </div>
    );

  const { placeName, placeDescription } = data.data;

  const imageProps =
    orientation === 'portrait'
      ? { width: 220, height: 354, backSrc: '/assets/letter_card_backv.png' }
      : { width: 354, height: 220, backSrc: '/assets/letter_card_backh.png' };

  return (
    <div
      role='main'
      aria-label='엽서 상세 페이지'
      className={cn(
        'relative w-full h-[100vh] px-[2.4rem] bg-gray-50 mt-[10rem] flex flex-col items-center overflow-x-hidden overflow-y-auto',
        orientation === 'portrait' ? 'mb-[5rem]' : 'mb-[0rem]',
      )}
    >
      <Header
        title='저장한 엽서'
        onClick={() => router.back()}
        className={cn('fixed top-0 left-0 right-0 z-50')}
      />

      {/* 카드 섹션 */}
      <div
        className={cn(
          'flex flex-col justify-center items-center relative',
          orientation === 'portrait' ? 'mt-[0rem]' : 'mt-[20rem]',
        )}
      >
        <FlipCard
          frontSrc={imageUrl.trim()}
          backSrc={imageProps.backSrc}
          width={imageProps.width}
          height={imageProps.height}
        />
      </div>

      {/* 장소 카드 */}
      <div
        className={cn('fixed bottom-[12rem] left-0 right-0 z-50 px-[2.4rem]')}
      >
        <LocationCard
          name={placeName}
          address='주소 정보 없음'
          description={placeDescription}
          variant='gray'
          size='large'
        />
      </div>
    </div>
  );
};

export default PostCard;

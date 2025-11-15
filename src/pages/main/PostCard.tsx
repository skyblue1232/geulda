'use client';
import { useEffect, useState } from 'react';
import { BottomNav, FlipCard, LocationCard } from '@/shared/components';
import { PostCardActions } from '@/shared/components/main/components/PostCardActions/PostCardActions';
import { useImageOrientation } from '@/shared/hooks/useImageOrientation';
import { cn } from '@/shared/lib';
import { getPostcard } from '@/shared/utils/storage';
import { PostcardData } from '@/shared/api/main/node/types/stampAcquireTypes';

const PostCard = () => {
  const [postcard, setPostcard] = useState<PostcardData | null>(null);

  useEffect(() => {
    const stored = getPostcard();
    if (stored) setPostcard(stored);
  }, []);

  // 🔥 postcard가 null이어도 안전하게 처리
  const cleanedImageUrl = (
    postcard?.imageUrl || '/assets/letter_card_backv.png'
  ).trim();

  // 🔥 훅은 조건문 밖에서 항상 호출!
  const { orientation } = useImageOrientation(cleanedImageUrl);

  if (!postcard) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p>엽서 데이터를 불러오는 중...</p>
      </div>
    );
  }

  const { placeName, description, address } = postcard;

  const imageProps =
    orientation === 'portrait'
      ? { width: 220, height: 354, backSrc: '/assets/letter_card_backv.png' }
      : { width: 354, height: 220, backSrc: '/assets/letter_card_backh.png' };

  return (
    <div
      role='main'
      aria-label='엽서 획득 페이지'
      className={cn(
        'relative w-full h-[100vh] px-[2.4rem] bg-gradient-to-b from-pink-100 to-white flex flex-col items-center overflow-x-hidden overflow-y-auto',
        orientation === 'portrait' ? 'mb-[5rem]' : 'mb-[0rem]',
      )}
    >
      {/* 제목 */}
      <h1
        className={cn(
          'text-headline-md-serif text-center',
          orientation === 'portrait' ? 'mt-[6rem]' : 'mt-[10rem]',
        )}
      >
        {placeName}의 엽서 획득!
      </h1>

      {/* 카드 영역 */}
      <div
        className={cn(
          'flex flex-col justify-center items-center relative',
          orientation === 'portrait' ? 'mt-[0rem]' : 'mt-[6rem]',
        )}
      >
        <FlipCard
          frontSrc={cleanedImageUrl}
          backSrc={imageProps.backSrc}
          width={imageProps.width}
          height={imageProps.height}
        />

        <div
          className={cn(
            'w-full flex justify-end',
            orientation === 'portrait'
              ? 'mt-[6.5rem] mb-[2rem]'
              : 'mt-[1rem] mb-[6rem]',
          )}
        >
          <PostCardActions imageUrl={cleanedImageUrl} placeName={placeName} />
        </div>
      </div>

      <LocationCard
        name={placeName}
        address={address}
        description={description}
        variant='gray'
        size='large'
      />

      <BottomNav />
    </div>
  );
};

export default PostCard;

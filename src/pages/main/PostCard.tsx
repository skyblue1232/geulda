'use client';

import { useEffect, useState } from 'react';
import { BottomNav, FlipCard, LocationCard } from '@/shared/components';
import { PostCardActions } from '@/shared/components/main/components/PostCardActions/PostCardActions';
import { useImageOrientation } from '@/shared/hooks/useImageOrientation';
import { cn } from '@/shared/lib';
import { getPostcard } from '@/shared/utils/storage'; // 👈 로컬스토리지 유틸 import

interface PostcardData {
  imageUrl: string;
  placeName: string;
  description: string;
  address: string;
  hidden: boolean;
}

const PostCard = () => {
  const [postcard, setPostcard] = useState<PostcardData | null>(null);

  // ✅ 로컬스토리지에서 데이터 불러오기
  useEffect(() => {
    const stored = getPostcard();
    if (stored) {
      setPostcard(stored);
      console.log('📮 불러온 엽서 데이터:', stored);
    } else {
      console.warn('로컬스토리지에 엽서 데이터가 없습니다.');
    }
  }, []);

  // 데이터가 아직 없으면 로딩 표시
  if (!postcard) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-gray-500 text-lg'>엽서 데이터를 불러오는 중...</p>
      </div>
    );
  }

  const { imageUrl, placeName, description, address } = postcard;

  const { orientation } = useImageOrientation(imageUrl);

  // orientation에 따라 카드 크기와 뒷면 이미지 설정
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
        {/* 카드 */}
        <FlipCard
          frontSrc={imageUrl}
          backSrc={imageProps.backSrc}
          width={imageProps.width}
          height={imageProps.height}
        />

        {/* 공유 / 저장 버튼 */}
        <div
          className={cn(
            'w-full flex justify-end',
            orientation === 'portrait'
              ? 'mt-[6.5rem] mb-[2rem]'
              : 'mt-[1rem] mb-[6rem]',
          )}
        >
          <PostCardActions imageUrl={imageUrl} placeName={placeName} />
        </div>
      </div>

      {/* 장소 카드 */}
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

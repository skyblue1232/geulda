'use client';
import { BottomNav, FlipCard, LocationCard } from '@/shared/components';
import { PostCardActions } from '@/shared/components/main/components/PostCardActions/PostCardActions';
import { useImageOrientation } from '@/shared/hooks/useImageOrientation';

const PostCard = () => {
  const label = '가톨릭대';
  const frontSrc = '/assets/card.png';

  const { orientation, size } = useImageOrientation(frontSrc);

  const imageProps =
    orientation === 'portrait'
      ? { width: 220, height: 354, backSrc: '/assets/card4.png' }
      : { width: 354, height: 220, backSrc: '/assets/card2.png' };

  return (
    <div
      role='main'
      aria-label='엽서 획득 페이지'
      className='
        relative w-full h-[100vh] px-[2.4rem] gap-[5rem] 
        bg-gradient-to-b from-pink-100 to-white
        flex flex-col  items-center
        overflow-x-hidden overflow-y-hidden
      '
    >
      <h1 className='text-headline-md-serif mt-[10rem] text-center'>
        {label}의 엽서 획득!
      </h1>

      {/* ✅ 자동 비율에 따라 카드 크기 조절 */}
      <div className='flex justify-center items-center flex-col'>
        <FlipCard
          frontSrc={frontSrc}
          backSrc={imageProps.backSrc}
          width={imageProps.width}
          height={imageProps.height}
        />

        {/* 저장/공유 버튼 */}
        <PostCardActions />
      </div>

      <LocationCard
        name={label}
        address='경기도 부천시 가톨릭대길 43'
        description='가톨릭대학교의 캠퍼스에서 얻을 수 있는 특별한 엽서입니다.'
        variant='gray'
        size='large'
      />

      <BottomNav />
    </div>
  );
};

export default PostCard;

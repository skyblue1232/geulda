'use client';
import { BottomNav, FlipCard, LocationCard } from '@/shared/components';
import { PostCardActions } from '@/shared/components/main/components/PostCardActions/PostCardActions';
import { useImageOrientation } from '@/shared/hooks/useImageOrientation';
import { cn } from '@/shared/lib';

const PostCard = () => {
  const label = '가톨릭대';
  const frontSrc = '/assets/card3.png';

  const { orientation } = useImageOrientation(frontSrc);

  // ✅ 비율에 따라 이미지 크기 설정
  const imageProps =
    orientation === 'portrait'
      ? { width: 220, height: 354, backSrc: '/assets/card4.png' }
      : { width: 354, height: 220, backSrc: '/assets/card2.png' };

  return (
    <div
      role='main'
      aria-label='엽서 획득 페이지'
      className='
        relative w-full h-[100vh] px-[2.4rem]
        bg-gradient-to-b from-pink-100 to-white
        flex flex-col items-center
        overflow-x-hidden overflow-y-auto
      '
    >
      <h1 className='text-headline-md-serif mt-[10rem] text-center'>
        {label}의 엽서 획득!
      </h1>

      {/* ✅ orientation에 따라 margin 동적으로 조절 */}
      <div
        className={cn(
          'flex flex-col justify-center items-center relative',
          orientation === 'portrait' ? 'mt-[0rem]' : 'mt-[6rem]',
        )}
      >
        {/* 카드 */}
        <FlipCard
          frontSrc={frontSrc}
          backSrc={imageProps.backSrc}
          width={imageProps.width}
          height={imageProps.height}
        />

        {/* ✅ 세로일 때는 카드 높이만큼 여백 확보 */}
        <div
          className={cn(
            'w-full flex justify-end',
            orientation === 'portrait'
              ? 'mt-[6.5rem] mb-[2rem]'
              : 'mt-[1rem] mb-[6rem]',
          )}
        >
          <PostCardActions />
        </div>
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

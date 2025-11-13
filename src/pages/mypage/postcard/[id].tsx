'use client';
import { FlipCard, Header, LocationCard } from '@/shared/components';
import { useImageOrientation } from '@/shared/hooks/useImageOrientation';
import { cn } from '@/shared/lib';
import { useRouter } from 'next/router';

const PostCard = () => {
  const router = useRouter();
  const { id } = router.query;

  const label = '가톨릭대';
  const frontSrc = '/assets/card.png';

  const { orientation } = useImageOrientation(frontSrc);

  // ✅ 비율에 따라 이미지 크기 설정
  const imageProps =
    orientation === 'portrait'
      ? { width: 220, height: 354, backSrc: '/assets/letter_card_backv.png' }
      : { width: 354, height: 220, backSrc: '/assets/letter_card_backh.png' };

  return (
    <div
      role='main'
      aria-label='엽서 획득 확인 페이지'
      className={cn(
        'relative w-full h-[100vh] px-[2.4rem] bg-gray-50 mt-[10rem] flex flex-col items-center overflow-x-hidden overflow-y-auto',
        orientation === 'portrait' ? 'mb-[5rem]   ' : 'mb-[0rem]  ',
      )}
    >
      <Header
        title='저장한 엽서'
        onClick={() => router.back()}
        className={cn('fixed top-0 left-0 right-0 z-50')}
      />
      <div
        className={cn(
          'flex flex-col justify-center items-center relative',
          orientation === 'portrait' ? 'mt-[0rem]' : 'mt-[20rem]',
        )}
      >
        {/* 카드 */}
        <FlipCard
          frontSrc={frontSrc}
          backSrc={imageProps.backSrc}
          width={imageProps.width}
          height={imageProps.height}
        />
      </div>

      <div
        className={cn('fixed bottom-[12rem] left-0 right-0 z-50 px-[2.4rem]')}
      >
        <LocationCard
          name={label}
          address='경기도 부천시 가톨릭대길 43'
          description='가톨릭대학교의 캠퍼스에서 얻을 수 있는 특별한 엽서입니다.'
          variant='gray'
          size='large'
        />
      </div>
    </div>
  );
};

export default PostCard;

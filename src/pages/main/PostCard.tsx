'use client';
import { BottomNav, FlipCard, LocationCard } from '@/shared/components';
import { PostCardActions } from '@/shared/components/main/components/PostCardActions/PostCardActions';

const PostCard = () => {
  const label = '가톨릭대'; // 임시

  return (
    <div
      role='main'
      aria-label='엽서 획득 페이지'
      className='
        relative w-full h-[100vh] px-[2.4rem]
        bg-gradient-to-b from-pink-100 to-white
        flex flex-col justify-start items-center
        overflow-x-auto overflow-y-hidden 
      '
    >
      <h1 className='text-headline-md-serif mt-[8rem] mb-[8rem] text-center'>
        {label}의 엽서 획득!
      </h1>

      <FlipCard
        frontSrc='/assets/card.png'
        backSrc='/assets/card2.png'
        width={354}
        height={220}
      />
      <PostCardActions className='mt-[4rem]' />

      {/* ✅ 분리된 컴포넌트 */}

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

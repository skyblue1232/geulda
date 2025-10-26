// import Image from 'next/image';
import LocationCard from '@/shared/components/container/LocationCard';
import { BottomNav } from '@/shared/components/tab/BottomNav';
import { Icon } from '@/shared/icons';

const PostCard = () => {
  const label = '가톨ㅋㅋ릭대'; // 예시 데이터

  return (
    <div
      className='
        relative w-full h-[100vh] px-[2.4rem]
        bg-gradient-to-b from-pink-100 to-white
        flex flex-col justify-start items-center
        overflow-x-auto  overflow-y-hidden mb-[7rem]
      '
    >
      {/* 상단 타이틀 */}
      <h1 className='text-headline-md-serif text-b mt-[8rem] mb-[8rem] text-center'>
        {label}의 엽서 획득!
      </h1>

      {/* 엽서 이미지 */}
      <div className='relative bg-white w-full h-[22rem] flex justify-center items-center'>
        {/* <Image
          src='/assets/board.svg'
          alt='엽서 이미지'
          width={354}
          height={220}
          className='object-cover '
        /> */}
      </div>

      {/* 아이콘 버튼 (저장 / 공유) */}
      <div className='w-full flex justify-end mb-[7rem]'>
        <button className='flex  items-center justify-center w-[4.8rem] h-[4.8rem]'>
          <Icon name='Save' color='gray-400' size={28} />
        </button>
        <button className='flex items-center justify-center w-[4.8rem] h-[4.8rem]'>
          <Icon name='Export' color='gray-400' size={28} />
        </button>
      </div>

      {/* 장소 카드 */}
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

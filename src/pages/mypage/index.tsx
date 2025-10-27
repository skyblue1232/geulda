'use client';

import ProfilePhoto from '@/pages/mypage/components/ProfilePhoto';
import PostcardContainer from '@/pages/mypage/components/PostcardContainer';
import { EventCard, BottomNav } from '@/shared/components';

export default function MyPage() {
  const mockName = '이름';
  const mockImages = [
    '/1.jpg',
    '/11.jpg',
    '/3.jpg',
    '/11.jpg',
    '/3.jpg',
    '/11.jpg',
    '/3.jpg',
  ];
  const mockUser = {
    profileImageUrl: '/11.jpg',
  };

  const handleLogout = () => {
    alert('로그아웃');
  };

  return (
    <main className='w-full min-h-screen bg-white flex flex-col items-center'>
      <div className='w-full flex flex-col items-center px-[2.3rem] pb-[8.4rem]'>
        {/* 프로필 사진 */}
        <section className='w-full flex flex-col items-center mt-[2.8rem] gap-[1.3rem]'>
          <ProfilePhoto src={mockUser.profileImageUrl} />
          <p className='text-title-md'>{mockName}</p>
        </section>

        {/* 이벤트 카드 */}
        <section className='w-full mt-[1.6rem]'>
          <p className='text-label-lg mb-[1rem]'>저장한 행사</p>
          <div className='max-h-[15rem] overflow-y-auto no-scrollbar space-y-[1rem]'>
            <EventCard
              name='벚꽃 축제'
              address='서울 여의도'
              description='봄꽃 구경하며 엽서 이벤트 참여하기'
              variant='gray'
              size='large'
              imageSrc='/event1.jpg'
            />

            <EventCard
              name='여름 캠프'
              address='강원도 양양'
              description='여름 한정 스탬프 챌린지 참가!'
              variant='gray'
              size='large'
              imageSrc=''
            />
          </div>
        </section>

        {/* 엽서 컨테이너 */}
        <section className='w-full mt-[1.8rem]'>
          <p className='text-label-lg mb-[0.9rem]'>저장한 엽서</p>
          <PostcardContainer
            postcards={mockImages}
            onClickCard={(i) => alert(`${i + 1}번째 엽서`)}
          />
        </section>

        <button
          type='button'
          onClick={handleLogout}
          className='
            mt-[2.1rem] text-label-md text-gray-400 cursor-pointer underline underline-offset-[0.25rem]
          '
        >
          로그아웃
        </button>
      </div>
      <BottomNav />
    </main>
  );
}

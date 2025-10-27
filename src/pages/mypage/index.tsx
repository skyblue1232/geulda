'use client';

import ProfilePhoto from '@/pages/mypage/components/ProfilePhoto';
import PostcardContainer from '@/pages/mypage/components/PostcardContainer';
import { EventCard, BottomNav } from '@/shared/components';

export default function MyPage() {
  const mockName = '이수민';
  const mockImages = [
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
    '/2.jpg',
    '/1.jpg',
    '/11.jpg',
    '/2.jpg',
    '/1.jpg',
    '/11.jpg',
  ];
  const mockUser = {
    profileImageUrl: '/11.jpg',
  };

  const handleLogout = () => {
    alert('로그아웃');
  };

  return (
    <main className='w-full min-h-screen bg-white flex flex-col items-center'>
      <div className='w-full flex flex-col items-center px-[2.3rem] pb-[2rem]'>
        {/* 프로필 */}
        <section className='w-full flex flex-col items-center mt-[2.4rem] gap-[1.0rem]'>
          <ProfilePhoto src={mockUser.profileImageUrl} />
          <p className='text-title-md'>{mockName}</p>
        </section>

        {/* 저장한 행사 */}
        <section className='w-full mt-[1.6rem]'>
          <p className='text-label-lg mb-[1rem] pl-[1rem]'>저장한 행사</p>
          <div className='max-h-[18rem] overflow-y-auto no-scrollbar space-y-[1rem]'>
            <EventCard
              name='골반 통신 이상 감지'
              address='우리집'
              description='내 골반이 멈추지 않아서 일까?'
              variant='gray'
              size='large'
              imageSrc='/1.jpg'
            />
            <EventCard
              name='이혼 숙려 캠프'
              address='강원도 양양'
              description='앙 이라는 감정'
              variant='gray'
              size='large'
              imageSrc=''
            />
          </div>
        </section>

        {/* 저장한 엽서 */}
        <section className='w-full mt-[1.8rem]'>
          <p className='text-label-lg mb-[0.6rem] pl-[1rem]'>저장한 엽서</p>
          <PostcardContainer
            postcards={mockImages}
            onClickCard={(i) => alert(`${i + 1} 엽서 장소 페이지 이동`)}
          />
        </section>

        {/* 로그아웃 */}
        <button
          type='button'
          onClick={handleLogout}
          className='mt-[2.1em] text-label-md text-gray-400 cursor-pointer underline underline-offset-[0.25rem]'
        >
          로그아웃
        </button>
      </div>
        <BottomNav />
    </main>
  );
}

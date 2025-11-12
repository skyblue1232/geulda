'use client';

import React, { useEffect, useState } from 'react';
import ProfilePhoto from '@/pages/mypage/components/ProfilePhoto';
import PostcardContainer from '@/pages/mypage/components/PostcardContainer';
import LoginRequired from '@/pages/mypage/components/LoginRequired';
import LogoutConfirm from '@/pages/mypage/components/LogoutConfirm';
import { EventCard, BottomNav, PopupSet } from '@/shared/components';
import { useUserStatus } from '@/shared/hooks/useUserStatus';
import { usePopup } from '@/shared/hooks/mypage/usePopup';

export default function MyPage() {
  const { isLoggedIn } = useUserStatus();
  const {
    showLoginPopup,
    showLogoutPopup,
    openLogin,
    openLogout,
    closeLogin,
    closeLogout,
  } = usePopup();

  useEffect(() => {
    if (isLoggedIn === false) {
      openLogin();
    }
  }, [isLoggedIn, openLogin]);

  return (
    <main
      className='w-full min-h-screen bg-white flex flex-col items-center'
      role='main'
      aria-label='마이 페이지'
    >
      <div className='w-full flex flex-col items-center px-[2.3rem] pb-[2rem]'>
        {/* 프로필 */}
        <section
          aria-label='프로필 영역'
          className='w-full flex flex-col items-center mt-[2.4rem] gap-[1.0rem]'
        >
          <ProfilePhoto />
          <p className='text-title-md'>이름</p>
        </section>

        {/* 저장한 행사 */}
        <section aria-label='저장한 행사' className='w-full mt-[1.6rem]'>
          <p className='text-label-lg mb-[1rem] pl-[1rem]'>저장한 행사</p>
          <div className='max-h-[18rem] overflow-y-auto no-scrollbar space-y-[1rem]'>
            <EventCard
              name='행사 이름'
              address='우리집'
              description='행사 설명'
              variant='gray'
              size='large'
              imageSrc=''
            />
            <EventCard
              name='행사 이름'
              address='우리집'
              description='행사 설명'
              variant='gray'
              size='large'
              imageSrc=''
            />
          </div>
        </section>

        {/* 저장한 엽서 */}
        <section aria-label='저장한 엽서' className='w-full mt-[1.8rem]'>
          <p className='text-label-lg mb-[0.6rem] pl-[1rem]'>저장한 엽서</p>
          <PostcardContainer postcards={[]} />
        </section>

        {/* 로그아웃 */}
        <button
          type='button'
          onClick={openLogout}
          className='mt-[2.1rem] text-label-md text-gray-400 cursor-pointer underline underline-offset-[0.25rem]'
        >
          로그아웃
        </button>
      </div>
      <BottomNav />

      {showLogoutPopup && <LogoutConfirm onClose={closeLogout} />}
      {showLoginPopup && <LoginRequired onClose={closeLogin} />}
    </main>
  );
}

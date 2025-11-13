'use client';
import { Icon } from '@/shared/icons';
import { useRouter } from 'next/router';
import { cn } from '@/shared/lib';
import LoginButton from '@/shared/components/auth/LoginButton';
import RecentLoginBubble from '@/shared/components/auth/RecentLoginBubble';
import { useRecentLogin } from '@/shared/hooks/useRecentLogin';

export default function LoginPage() {
  const { recentPlatform, saveRecentPlatform } = useRecentLogin();
  const router = useRouter();
  const PLATFORM = {
    KAKAO: 'kakao',
    GOOGLE: 'google',
  } as const;

  const PLATFORM_DISPLAY = {
    [PLATFORM.KAKAO]: '카카오',
    [PLATFORM.GOOGLE]: '구글',
  } as const;

  //로그인
  const handleLoginClick = (platformDisplay: string) => {
    const platform = Object.entries(PLATFORM_DISPLAY).find(
      ([_, display]) => display === platformDisplay,
    )?.[0];
    if (!platform) return;

    saveRecentPlatform(platform);
    const base = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!base) {
      console.error('NEXT_PUBLIC_BACKEND_URL is not defined');
      return;
    }
    const url = `${base}/oauth2/authorization/${platform}`;
    window.location.href = url;
  };

  //비회원 로그인
  const handleGuestClick = () => {
    if (document.referrer && document.referrer !== window.location.href) {
      router.back();
    } else {
      router.push('/main');
    }
  };

  return (
    <main className='w-full flex flex-col items-center bg-white'>
      {/* 그라데이션 영역 */}
      <div className='relative w-full h-[22vw] min-h-[14rem] max-h-[28rem]'>
        <svg
          aria-hidden='true'
          focusable='false'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 402 194'
          className='absolute inset-0 w-full h-full'
          preserveAspectRatio='none'
        >
          <path
            d='M402 180.922C257.925 56.9753 160.195 270.883 0 161.93V0H402V180.922Z'
            fill='url(#paint0_linear_mint)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_mint'
              x1='201.53'
              y1='0'
              x2='201'
              y2='163'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#D9FAFB' />
              <stop offset='1' stopColor='#8CEFF2' />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 콘텐츠 */}
      <section
        className={cn(
          'w-full flex flex-col items-center text-center',
          'px-[6.8rem] pt-[6rem]',
        )}
      >
        {/* 로고 영역 */}
        <div className='flex flex-col items-center'>
          <Icon name='Logo' size={164} />
          <p className='text-label-serif text-mint-900 mt-[5rem] mb-[2.8rem]'>
            만화 속 부천 여행
            <br />
            10개 명소를 탐험하고 엽서를 모아보세요!
          </p>
        </div>

        <div className='flex flex-col items-center mt-[5rem] gap-[2.1rem]'>
          <p className='text-label-lg text-gray-400'>start with</p>

          <div className='flex gap-[1.5rem] relative'>
            {/* 카카오 */}
            <div className='relative'>
              <LoginButton
                platform='kakao'
                onClick={() => handleLoginClick('카카오')}
              />
              {recentPlatform === 'kakao' && (
                <div
                  className='absolute -top-[2.5rem] left-1/2 -translate-x-1/2 
          w-auto min-w-max h-auto flex-shrink-0 pointer-events-none'
                >
                  <RecentLoginBubble />
                </div>
              )}
            </div>

            {/* 구글 */}
            <div className='relative'>
              <LoginButton
                platform='google'
                onClick={() => handleLoginClick('구글')}
              />
              {recentPlatform === 'google' && (
                <div
                  className='absolute -top-[2.5rem] left-1/2 -translate-x-1/2 
          w-auto min-w-max h-auto flex-shrink-0 pointer-events-none'
                >
                  <RecentLoginBubble />
                </div>
              )}
            </div>
          </div>

          <p
            className='text-label-md text-gray-400 cursor-pointer underline underline-offset-[0.25rem]'
            onClick={handleGuestClick}
          >
            비회원 로그인
          </p>
        </div>

        {/* 안내문 */}
        <div className='mt-[5rem] text-label-md text-gray-400 whitespace-nowrap text-ellipsis overflow-hidden text-center'>
          <p>비회원은 스탬프 저장과 공유 기능을 사용할 수 없습니다.</p>
        </div>
      </section>
    </main>
  );
}
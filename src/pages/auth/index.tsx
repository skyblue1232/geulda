/* 로그인 페이지 */
'use client';

import KakaoLoginButton from './components/KakaoLoginButton';
import GoogleLoginButton from './components/GoogleLoginButton';
import RecentLoginBubble from './components/RecentLoginBubble';

export default function LoginPage() {
  const handleClick = () => {
    alert('카카오 버튼 클릭!');
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-6'>
      {/* 버튼 렌더링 */}
      <KakaoLoginButton onClick={handleClick} />
      <GoogleLoginButton onClick={handleClick} />
      <RecentLoginBubble />
    </main>
  );
}

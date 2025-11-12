'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { exchangeTempToken } from '@/shared/api/auth';
import Loading from '@/pages/loading';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const searchParams = new URLSearchParams(router.asPath.split('?')[1]);
    const tempToken = searchParams.get('temp_token');
    console.log('tempToken:', tempToken);

    if (!tempToken) return;

    const handleLogin = async () => {
      try {
        const res = await exchangeTempToken(tempToken);
        console.log('API 응답:', res);

        if (res.success) {
          console.log('redirect to main 페이지');
          router.replace('/main');
        } else {
          alert(res.message || '로그인에 실패했습니다.');
          router.replace('/auth');
        }
      } catch (error) {
        console.error('오류:', error);
        router.replace('/auth');
      }
    };

    handleLogin();
  }, [router.isReady, router.asPath]);

  return <Loading />;
}

/* 주석은 SVGO 해결 후 제거 예정 */
'use client';
// import { Icon } from '@/shared/icons';
import Image from 'next/image';

interface KakaoLoginButtonProps {
  onClick: () => void;
}

export default function KakaoLoginButton({ onClick }: KakaoLoginButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='
        flex w-[5rem] h-[5rem] justify-center items-center flex-shrink-0
        rounded-full bg-[#FEE500] shadow-[0_0_4px_rgba(0,0,0,0.30)]
      '
      aria-label='카카오 로그인'
    >
      {/* <Icon name='KakaoIcon' size={24} /> */}
      <Image
        src='/svgs/KakaoIcon.svg'
        alt='Kakao Logo'
        width={28}
        height={28}
      />
    </button>
  );
}

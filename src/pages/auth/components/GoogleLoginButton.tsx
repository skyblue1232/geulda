/* 주석은 SVGO 해결 후 제거 예정 */
'use client';
// import { Icon } from '@/shared/icons';
import Image from 'next/image';

interface GoogleLoginButtonProps {
  onClick: () => void;
}

export default function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='
        flex w-[5rem] h-[5rem] justify-center items-center flex-shrink-0
        rounded-full bg-[#FFF] shadow-[0_0_4px_rgba(0,0,0,0.30)]
      '
      aria-label='구글 로그인'
    >
      {/* <Icon name='GoogleIcon' size={24} /> */}
      <Image
        src='/svgs/GoogleIcon.svg'
        alt='Google Logo'
        width={36}
        height={36}
      />
    </button>
  );
}

// SVGO 해결후 Image → Icon으로 교체 예정
'use client';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';


const loginButtonVariants = cva(
  `
    flex justify-center items-center flex-shrink-0
    w-[5rem] h-[5rem] rounded-full
    shadow-[0_0_4px_rgba(0,0,0,0.30)]
    transition-all duration-150 active:scale-95
  `,
  {
    variants: {
      platform: {
        google: 'bg-white',
        kakao: 'bg-[#FEE500]',
      },
    },
    defaultVariants: {
      platform: 'google',
    },
  }
);

interface LoginButtonProps extends VariantProps<typeof loginButtonVariants> {
  onClick: () => void;
  className?: string;
}

export default function LoginButton({
  onClick,
  platform,
  className,
}: LoginButtonProps) {
  const iconData = {
    google: {
      src: '/svgs/GoogleIcon.svg',
      alt: 'Google Logo',
      width: 36,
      height: 36,
      label: '구글 로그인',
    },
    kakao: {
      src: '/svgs/KakaoIcon.svg',
      alt: 'Kakao Logo',
      width: 28,
      height: 28,
      label: '카카오 로그인',
    },
  };

  const { src, alt, width, height, label } = iconData[platform ?? 'google'];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(loginButtonVariants({ platform }), className)}
    >
      <Image src={src} alt={alt} width={width} height={height} priority />
    </button>
  );
}

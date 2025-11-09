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
      src: '/assets/GoogleIcon.svg',
      alt: 'Google Logo',
      width: 36,
      height: 36,
      label: '구글 로그인',
    },
    kakao: {
      src: '/assets/KakaoIcon.svg',
      alt: 'Kakao Logo',
      width: 28,
      height: 28,
      label: '카카오 로그인',
    },
  };

  if (!platform || !(platform in iconData)) {
    throw new Error(`Invalid platform: ${platform}`);
  }
  const { src, alt, width, height, label } = iconData[platform as keyof typeof iconData];

   const handleClick = () => {
    if (onClick) return onClick();
    const base = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url =
      platform === 'kakao'
        ? `${base}/oauth2/authorization/kakao`
        : `${base}/oauth2/authorization/google`;

    window.location.href = url;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={cn(loginButtonVariants({ platform }), className)}
    >
      <Image src={src} alt={alt} width={width} height={height} priority />
    </button>
  );
}

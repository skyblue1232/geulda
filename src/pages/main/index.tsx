import { cn } from '@/shared/lib';
import StampBoard from './components/stampBoard/StampBoard';
import { ControlBar } from '@/shared/components';
import Image from 'next/image';

export interface MainPageProps {
  className?: string;
}

export default function MainPage({ className }: MainPageProps) {
  return (
    <div
      className={cn('px-[2.4rem] bg-white flex flex-col gap-[1rem]', className)}
    >
      <ControlBar
        isLoggedIn={false}
        onLogin={() => {}}
        userName='글다'
        className='fixed top-[0.6rem] left-0 right-0 z-50 px-[2rem]'
      />

      <main className=' w-full pt-[72px] '>
        {/* 배너 */}
        <section className='relative w-full h-auto aspect-[354/79.43] pb-[1rem]'>
          <Image
            src='/assets/bannerMain.svg'
            alt='만화 속 부천 여행 배너 이미지'
            fill
            className='object-cover'
            sizes='w-full'
            priority
          />
        </section>

        {/* 보드판 */}
        <section className='relative w-full h-auto aspect-[354/426.36] pb-[1rem]'>
          <Image
            src='/assets/board.svg'
            alt='보드판'
            fill
            className='object-cover'
            sizes='w-full'
          />
        </section>

        {/* 스탬프 보드 */}
        <StampBoard count={3} total={8} className='mt-2' />
      </main>
    </div>
  );
}

import { cn } from '@/shared/lib';
import StampBoard from './components/stampBoard/StampBoard';
import { ControlBar } from '@/shared/components';
import Image from 'next/image';
import router from 'next/router';

export default function MainPage() {
  return (
    <div className={cn('px-[2.4rem] bg-white flex flex-col gap-[1rem] h-full')}>
      <ControlBar
        isLoggedIn={false}
        onLogin={() => {}}
        userName='글다'
        className='fixed top-[0.6rem] left-0 right-0 z-50 px-[2rem]'
      />

      <main className='w-full pt-[6.2rem] flex flex-col gap-4 overflow-auto'>
        <section>
          <Image
            src='/assets/bannerMain.svg'
            alt='...'
            width={354}
            height={79}
            className='w-full h-auto object-cover block'
          />
        </section>

        <section
          onClick={() => {
            // ✅ 클릭 시 페이지 이동
            router.push('/main/Board');
          }}
        >
          <Image
            src='/assets/board.svg'
            alt='보드판'
            width={354}
            height={426.36}
            className='w-full h-auto object-cover block'
          />
        </section>

        <StampBoard count={3} total={10} />
      </main>
    </div>
  );
}

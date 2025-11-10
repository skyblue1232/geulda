import { cn } from '@/shared/lib';
import { BottomNav, ControlBar } from '@/shared/components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import StampBoard from '@/pages/main/components/stampBoard/StampBoard';

export default function MainPage() {
  const router = useRouter();
  return (
    <div
      className={cn(
        'px-[2.4rem] bg-white flex flex-col gap-[1rem] h-full pt-[1.3rem] pb-[12rem]',
      )}
    >
      <ControlBar className='fixed top-[1rem] left-0 right-0 z-50 px-[2rem]' />

      <main className='w-full pt-[6.3rem] flex flex-col gap-4 overflow-auto'>
        <section>
          <Image
            src='/assets/bannerMain.svg'
            alt=''
            aria-hidden='true'
            width={354}
            height={79}
            className='w-full h-auto object-cover block'
          />
        </section>

        <section
          role='button'
          tabIndex={0}
          aria-label='보드판으로 이동'
          onClick={() => {
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
      <BottomNav />
    </div>
  );
}

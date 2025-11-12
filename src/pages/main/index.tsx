import { cn } from '@/shared/lib';
import { BottomNav, ControlBar } from '@/shared/components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import StampBoard from '@/shared/components/main/components/stampBoard/StampBoard';
import { useGetStampStatus } from '@/shared/main/queries/useGetStampStatus';

export default function MainPage() {
  const router = useRouter();

  const { data, isLoading, isError } = useGetStampStatus();

  return (
    <div
      className={cn(
        'px-[2.4rem] bg-white flex flex-col gap-[1rem] h-full pt-[1.3rem] pb-[12rem]',
      )}
    >
      <ControlBar
        isLoggedIn={false}
        onLogin={() => {}}
        userName='글다'
        className='fixed top-[1rem] left-0 right-0 z-50 px-[2rem]'
      />

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
            className='w-full h-auto object-cover block cursor-pointer transition-transform hover:scale-[1.01]'
          />
        </section>

        {isLoading ? (
          <p className='text-gray-400 text-center py-4'>불러오는 중...</p>
        ) : isError ? (
          <p className='text-red-400 text-center py-4'>
            데이터를 불러오지 못했습니다 😢
          </p>
        ) : (
          <StampBoard
            count={data?.collectedStampCount ?? 0}
            total={data?.totalStampCount ?? 10}
          />
        )}
      </main>

      <BottomNav />
    </div>
  );
}

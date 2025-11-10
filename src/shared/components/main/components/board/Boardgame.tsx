'use client';
import Image from 'next/image';
import { boardData } from '@/shared/constants/main/boardData';
import { useRouter } from 'next/router';

const Boardgame = () => {
  const router = useRouter();

  const handleCellClick = (label: string) => {
    // TODO : 로그인 여부 체크
    router.push({
      pathname: '/main/Node',
      query: { label },
    });
  };

  return (
    <div
      className='relative w-full h-full bg-[#46d1cd] overflow-hidden'
      role='region'
      aria-label='보드게임 화면'
    >
      <Image
        src='/assets/background_.svg'
        alt=''
        width={402}
        height={755}
        className='w-full h-full object-cover'
        priority
        aria-hidden='true'
      />

      <div
        className='
          absolute inset-0
          grid grid-cols-4 gap-0
          px-[2.1rem] py-[1.5rem]
        '
      >
        {boardData.map((row, r) =>
          row.map((cell, c) => {
            const key = `cell-${r}-${c}`;

            if (!cell.active) {
              return <div key={key} className='aspect-square bg-transparent' />;
            }

            return (
              <div
                key={key}
                role='button'
                tabIndex={0}
                aria-label={
                  cell.label ? `${cell.label} 명소로 이동` : '명소로 이동'
                }
                onClick={() => {
                  handleCellClick;
                }}
                className='
                  aspect-square
                  bg-transparent
                  cursor-pointer
                '
              ></div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Boardgame;

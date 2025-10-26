'use client';
import Image from 'next/image';
import { boardData } from '@/shared/constants/main/boardData';
import { useRouter } from 'next/router';

const Boardgame = () => {
  const router = useRouter();
  return (
    <div className='relative w-full  h-full bg-[#46d1cd] overflow-hidden'>
      <Image
        src='/assets/background_.svg'
        alt='board background'
        width={402}
        height={755}
        className='w-full h-full object-cover'
        priority
      />

      <div
        className='
          absolute top-0 left-0
          w-full h-full
          grid grid-cols-4 grid-rows-8 gap-0
          px-[2rem] pb-[1.7rem]
        '
      >
        {boardData.map((row, r) =>
          row.map((cell, c) => {
            const key = `cell-${r}-${c}`;

            if (!cell.active) {
              return <div key={key} className='bg-transparent' />;
            }

            return (
              <div
                key={key}
                onClick={() => {
                  router.push({
                    pathname: '/main/Node',
                    query: { label: cell.label },
                  });
                }}
              ></div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Boardgame;

'use client';
import Image from 'next/image';
import { boardData } from '@/shared/constants/main/boardData';
import { useRouter } from 'next/router';

const Boardgame = () => {
  const router = useRouter();

  return (
    <div className='relative w-full h-full bg-[#46d1cd] overflow-hidden'>
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
          absolute inset-0
          grid grid-cols-4 gap-0
          px-[2rem] py-[1.4rem]
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
                onClick={() => {
                  router.push({
                    pathname: `/main/node/${cell.label}`,
                    query: { label: cell.label },
                  });
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

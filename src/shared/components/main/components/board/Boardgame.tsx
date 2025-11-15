'use client';
import Image from 'next/image';
import { boardData } from '@/shared/constants/main/boardData';
import { useRouter } from 'next/router';
import { useGetHasBoardStamp } from '@/shared/main/queries/useGetHasBoardStamp';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/icons';

const Boardgame = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetHasBoardStamp();

  const places = data?.data?.places ?? [];
  console.log('보드게임 스탬프 현황:', places);

  if (isLoading) return <p className='text-center mt-10'>로딩 중...</p>;
  if (isError)
    return <p className='text-center mt-10'>데이터를 불러오지 못했습니다 😢</p>;

  return (
    <div
      className='relative w-full h-full bg-[#46d1cd] overflow-hidden'
      role='region'
      aria-label='보드게임 화면'
    >
      <Image
        src='/assets/background.png'
        alt=''
        width={402}
        height={755}
        className='w-full h-full object-cover'
        priority
        aria-hidden='true'
      />
      <div className='absolute inset-0 grid grid-cols-4 gap-0 px-[2.1rem] py-[1.5rem]'>
        {boardData.map((row, r) =>
          row.map((cell, c) => {
            const key = `cell-${r}-${c}`;
            if (!cell.active)
              return <div key={key} className='aspect-square bg-transparent' />;

            const matched = places.find((p) => Number(p.placeId) === Number(cell.placeId));
            const name = matched?.name ?? cell.name;
            const hasStamp = matched?.hasStamp ?? false;

            return (
              <div
                key={key}
                role='button'
                tabIndex={0}
                aria-label={`${name}로 이동`}
                onClick={() =>
                  router.push({
                    pathname: `/main/node/${cell.placeId}`,
                    query: { label: name },
                  })
                }
                className={cn(
                  'aspect-square cursor-pointer flex items-center justify-center transition-all duration-300',
                )}
              >
                {hasStamp && (
                  <Icon
                    name='Stamp'
                    color='gray-50'
                    size={74}
                    className='opacity-20'
                  />
                )}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Boardgame;

'use client';
import Image from 'next/image';
import { boardData as initialBoardData } from '@/shared/constants/main/boardData';
import { useRouter } from 'next/router';
import { useGetHasBoardStamp } from '@/shared/main/queries/useGetHasBoardStamp';
import { useMemo } from 'react';
import { cn } from '@/shared/lib';

const Boardgame = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetHasBoardStamp();

  // 서버 데이터
  const places = data?.result?.places ?? [];
  console.log('보드게임 스탬프 현황:', places);

  // 🔗 placeId로 서버 데이터 매칭
  const mappedBoardData = useMemo(() => {
    return initialBoardData.map((row) =>
      row.map((cell) => {
        if (!cell.active) return cell;

        // 서버의 동일 placeId 찾기
        const matched = places.find((p) => p.placeId === cell.placeId);

        // 없으면 기본 cell 유지
        return {
          ...cell,
          name: matched?.name ?? '',
          hasStamp: matched?.hasStamp ?? false,
        };
      }),
    );
  }, [places]);

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
        src='/assets/background_.svg'
        alt=''
        width={402}
        height={755}
        className='w-full h-full object-cover'
        priority
        aria-hidden='true'
      />

      <div className='absolute inset-0 grid grid-cols-4 gap-0 px-[2.1rem] py-[1.5rem]'>
        {mappedBoardData.map((row, r) =>
          row.map((cell, c) => {
            const key = `cell-${r}-${c}`;
            if (!cell.active)
              return <div key={key} className='aspect-square bg-transparent' />;

            return (
              <div
                key={key}
                role='button'
                tabIndex={0}
                aria-label={`${cell.active || '명소'}로 이동`}
                onClick={() =>
                  router.push({
                    pathname: `/main/node/${cell.placeId}`,
                    query: { label: cell.placeId },
                  })
                }
                className={cn(
                  'aspect-square cursor-pointer transition-all duration-300',
                  cell.placeId ? 'bg-cover bg-center' : 'bg-transparent',
                )}
              />
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Boardgame;

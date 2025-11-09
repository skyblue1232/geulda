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
      className="relative w-full h-full bg-[#46d1cd] overflow-hidden"
      role="region" 
      aria-label="보드게임 화면"
    >
      <Image
        src="/assets/background_.svg"
        alt=""                       
        width={402}
        height={755}
        className="w-full h-full object-cover"
        priority
        aria-hidden="true"   
      />

      <div
        className="
          absolute top-0 left-0
          w-full h-full
          grid grid-cols-4 grid-rows-8 gap-0
          px-[2rem] pb-[1.7rem]
        "
        role="group"
        aria-label="명소 탐험 보드"
      >
        {boardData.map((row, r) =>
          row.map((cell, c) => {
            const key = `cell-${r}-${c}`;

            if (!cell.active) {
              return (
                <div
                  key={key}
                  className="bg-transparent"
                  aria-hidden="true"   // 비활성 셀은 낭독 제외
                />
              );
            }

            return (
              <div
                key={key}
                role="button"         
                tabIndex={0}      
                aria-label={cell.label ? `${cell.label} 명소로 이동` : '명소로 이동'}
                onClick={() => {
                  if (cell.label) handleCellClick(cell.label);
                }}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && cell.label) {
                    handleCellClick(cell.label);
                  }
                }}
              />
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Boardgame;

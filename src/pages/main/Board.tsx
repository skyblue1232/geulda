'use client';
import Image from 'next/image';
import { Header } from '@/shared/components';
import BoardPathFromMatrix from './components/board/BoardPathFromMatrix';
import { boardData } from './components/board/boardData';
import BoardPathBackground from './components/board/BoardPathBackground';

const Board = () => {
  return (
    <div className='relative w-full h-full bg-[#46d1cd] overflow-hidden'>
      {/* Header */}
      <Header title='지도' onClick={() => console.log('뒤로가기')} />

      {/* Background image */}
      <main className='relative pt-[11.8rem] '>
        <Image
          src='/assets/background.svg'
          alt='board background'
          width={402}
          height={755}
          className='w-auto h-full object-cover bottom-0 left-0 '
          priority
        />

        {/* <div
          className='
            absolute
            bottom-0 left-0  
            z-30
          '
        >
          <BoardPathFromMatrix boardData={boardData} />
        </div> */}
        <div
          className='
            absolute
            bottom-0 left-0  
            z-20
          '
        >
          <BoardPathBackground boardData={boardData} />
        </div>
      </main>
    </div>
  );
};

export default Board;

import BoardPathFromMatrix from './components/board/BoardPathFromMatrix';
import { boardData } from './components/board/boardData';

import Image from 'next/image';

const Board: any = () => {
  return (
    <div>
      <div className='absolute inset-0 p-3'>
        <Image
          src='/assets/background.svg'
          alt='...'
          width={402}
          height={755}
          className='w-full h-auto object-cover '
        />
        <BoardPathFromMatrix boardData={boardData} radius={500} />
      </div>
    </div>
  );
};
export default Board;

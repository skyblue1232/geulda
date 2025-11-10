import { Header } from '@/shared/components';
import Boardgame from '@/shared/components/main/components/board/Boardgame';
import { useRouter } from 'next/router';

const Board = () => {
  const router = useRouter();
  return (
    <div className='relative w-full h-[100vh] bg-[#46d1cd] overflow-auto'>
      <Header title='지도' onClick={() => router.back()} />

      <main className='relative pt-[11.8rem]'>
        <Boardgame />
      </main>
    </div>
  );
};

export default Board;

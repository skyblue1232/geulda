import { Header } from '@/shared/components';
import AddressCopy from '@/shared/components/button/AddressCopy';
import LocationCard from '@/shared/components/container/LocationCard';
import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import Image from 'next/image';

import router from 'next/router';

const Board = () => {
  const { label } = router.query;
  const isStamp = false;
  return (
    <div className='relative w-full h-[100vh] overflow-auto px-[2.4rem]'>
      <Header
        title={label ? String(label) : '노드'}
        onClick={() => router.back()}
      />

      <main className='relative pt-[14.3rem] gap-[1.2rem] flex flex-col '>
        <section className='relative w-full'>
          {/* ✅ 이미지 */}
          <Image
            src='/assets/board.svg'
            alt='보드판'
            width={354}
            height={436}
            className='w-full h-auto object-cover block rounded-[1.6rem]'
          />

          {/* ✅ 스탬프 아이콘 (오른쪽 하단 고정) */}
          <div
            className={cn('absolute bottom-0 right-0', isStamp && 'p-[2.5rem]')}
          >
            <Icon
              name={isStamp ? 'Stamp' : 'PressStamp'}
              color={isStamp ? 'pink-400' : 'gray-50'}
              size={isStamp ? 100 : 160}
            />
          </div>
        </section>
        <LocationCard
          name={label ? String(label) : '노드'}
          address='주소'
          description='장소에 대한 설명'
          variant='mint'
          size='large'
        />
        <AddressCopy
          variant='mint'
          value='인천광역시 계양구 오조산로 31길(복사되어야할 주소)'
          label={label ? String(label) : '노드'}
        />
      </main>
    </div>
  );
};

export default Board;

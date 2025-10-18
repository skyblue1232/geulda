import { Icon } from '@/shared/icons';
import LocationBubble from '@/shared/components/container/LocationBubble';
import LocationCard from '@/shared/components/container/LocationCard';
import EventCard from '@/shared/components/container/EventCard';
import AddressCopy from '@/shared/components/button/AddressCopy';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-[3rem]'>
      <LocationBubble name='안녕하쌉사리와요길면축약' imageSrc='/11.jpg' />

      <LocationCard
        name='사쿠야 카페'
        address='서울 중구 을지로'
        description='편안한 분위기의 카페로, 다양한 음료와 디저트를 제공합니다.'
        variant='gray'
        size='medium'
      />

      <EventCard
        name='사쿠야 페스티벌'
        address='행사 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ장소'
        description='음악, 음식, 예술이 어우러ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ진 축제로, 모두가 함께 즐길 수 있는 행사입니다.'
        variant='mint'
        size='large'
      />
      <AddressCopy variant='gray' value='계양구청' />
    </main>
  );
}

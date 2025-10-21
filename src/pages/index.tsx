import { ControlBar, Header, Tag } from '@/shared/components';
import { Icon } from '@/shared/icons';
import Progress from './main/components/stampBoard/Progress';
import StampBoard from './main/components/stampBoard/StampBoard';

export default function Home() {
  return (
    <>
      <div className='flex flex-col items-center justify-center  min-h-screen py-2 bg-gray-50'>
        <main className='flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center'>
          <Header onClick={() => {}} className='' title={'글다'} />
          <ControlBar isLoggedIn={false} onLogin={() => {}} userName={''} />
          <ControlBar isLoggedIn={true} userName='홍길동' onLogin={() => {}} />
          <Progress value={80} className='w-64 m-10' />
          <Progress value={100} className='w-64 m-10' />
          <StampBoard count={3} className='w-[35.4rem]' />

          <h1 className='text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4'>
            초기 세팅 완료
            <Icon name='User' color='mint-600' />
          </h1>

          <Tag label='리스트로 보기' icon='MapPin_' variant='toggle' />
          <Tag label='지도로 보기' icon='FadersHorizontal' variant='toggle' />
          <Tag label='#데이트' variant='hash' />
          <Icon name='CalendarBlank' size={200} color='gray-900' />
          <Icon name='User' size={200} color='blue-400' />
          <Icon name='User' size={200} color='red-300' />
          <Icon name='User' size={200} color='red-300' />
          <p className='mt-3 text-lg sm:text-2xl text-gray-600'>
            Next.js(Page Router) + TS + Tailwind + Axios
          </p>
        </main>
      </div>
    </>
  );
}

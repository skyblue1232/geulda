import { Icon } from '@/shared/icons';
import StampBoard from './main/components/stampBoard/StampBoard';

export default function Home() {
  return (
    <>
      <div className='flex flex-col items-center justify-center  min-h-screen py-2 bg-gray-50'>
        <main className='flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center'>
          <h1 className='text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4'>
            초기 세팅 완료
            <Icon name='User' color='mint-600' />
          </h1>
          <StampBoard count={3} total={8} />
          <StampBoard count={3} total={9} />
          <StampBoard count={3} total={10} />
          <p className='mt-3 text-lg sm:text-2xl text-gray-600'>
            Next.js(Page Router) + TS + Tailwind + Axios
          </p>
        </main>
      </div>
    </>
  );
}

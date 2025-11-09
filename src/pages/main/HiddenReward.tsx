import Lottie from 'lottie-react';
import Logo_sliver from '../../../public/lottie/Logo_sliver.json';
import Confetti_revised from '../../../public/lottie/Confetti_revised.json';
import { useRouter } from 'next/router';

const HiddenReward = () => {
  const router = useRouter();

  return (
    <div
      className='
        relative w-full h-[100vh]
        bg-gradient-to-b from-mint-500 to-white
        flex flex-col justify-center items-center text-center
        overflow-hidden
        cursor-pointer
      '
      onClick={() =>
        router.push({
          pathname: '/main/PostCard',
        })
      }
    >
      <div className='absolute inset-0 z-0 pointer-events-none mt-0'>
        <Lottie
          animationData={Confetti_revised}
          loop
          autoplay
          className='w-full h-full object-cover'
        />
      </div>

      <div className='relative z-10 flex flex-col items-center justify-center'>
        <h1 className='text-black mb-[4.5rem] text-headline-lg-serif'>
          Congrats!
        </h1>

        <p className='text-title-sm text-black mb-[6rem]'>
          축하합니다! <br />
          히든 리워드를 획득하셨습니다.
        </p>

        <Lottie
          animationData={Logo_sliver}
          loop
          autoplay
          className='w-[18rem] h-[18rem] mb-[6rem]'
        />

        <p className='text-label-md text-black mb-[7rem]'>
          가톨릭대 전설의 포켓몬 <br />
          ‘나무를 수호하는 종철씨’를 <br />
          획득하셨습니다!
        </p>

        <p className='text-label-serif text-mint-500'>click!</p>
      </div>
    </div>
  );
};

export default HiddenReward;

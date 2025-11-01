import Image from 'next/image';
import { useRouter } from 'next/router';
import { VIDEO_LOCATIONS } from '@/shared/constants/main/videoLocations';

export default function VideoPlaceholder() {
  const router = useRouter();
  const { label } = router.query;
  const location = VIDEO_LOCATIONS.find((loc) => loc.label === label);

  const handleVideoEnd = () => {
    router.push('/main/HiddenReward');
  };

  return (
    <div className="relative w-full h-[100vh] bg-mint-50 flex flex-col items-center pb-[9.5rem]">
      <div className="w-full px-[2.4rem] mt-[4.5rem] h-full">
        <div className="relative w-full h-full overflow-hidden rounded-[2rem]">
          {location ? (
            <video
              key={location.videoSrc}
              src={location.videoSrc}
              autoPlay
              muted
              playsInline
              controls
              onEnded={handleVideoEnd} 
              className="w-full h-full object-cover rounded-[2rem]"
            />
          ) : (
            <>
              <Image
                src="/assets/checkerBackground.svg"
                alt="체커 배경"
                fill
                className="object-cover"
                priority
              />
              <span className="absolute inset-0 flex justify-center items-center text-gray-800 text-body-md font-medium">
                Video play
              </span>
            </>
          )}
        </div>
      </div>

      <p className="mt-[1.4rem] text-mint-700 text-body-lg">
        영상 시청 이후 자동으로 넘어갑니다.
      </p>
    </div>
  );
}

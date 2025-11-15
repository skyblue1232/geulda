import { cn } from '@/shared/lib';
import { useRouter } from 'next/router';
import { VIDEO_LOCATIONS } from '@/shared/constants/main/videoLocations';
import VideoPlayer from '@/shared/components/main/components/video/VideoPlayer';

export default function VideoPlayPage() {
  const router = useRouter();
  const { placeName, hidden } = router.query;

  const location = VIDEO_LOCATIONS.find(
    (loc) => loc.label === placeName
  );

  const handleVideoEnd = () => {
    if (hidden === 'true') {
      router.push(
        `/main/HiddenReward?place=${encodeURIComponent(placeName as string)}`
      );
    } else {
      router.push(
        `/main/PostCard?place=${encodeURIComponent(placeName as string)}`
      );
    }
  };

  return (
    <div
      className={cn(
        'relative w-full h-[100vh] flex flex-col items-center pb-[9.5rem]',
        'bg-mint-50'
      )}
      role='main'
      aria-label={`${placeName} 영상 재생 페이지`}
    >
      <div className='w-full px-[2.4rem] mt-[4.5rem] h-full'>
        <VideoPlayer
          src={location?.videoSrc}
          label={location?.label || (placeName as string)}
          onEnd={handleVideoEnd}
        />
      </div>

      <p
        id='video-description'
        className='mt-[1.4rem] text-mint-700 text-body-lg'
        role='note'
        aria-label='영상 시청 이후 자동 이동 안내'
      >
        영상 시청 이후 자동으로 넘어갑니다.
      </p>

      <button
        onClick={handleVideoEnd}
        className="
          mt-[0.4rem]
          text-mint-700
          text-body-lg
          underline
        "
        aria-label="영상 스킵하고 다음으로 이동"
      >
        Skip
      </button>
    </div>
  );
}

import { cn } from '@/shared/lib';
import { useRouter } from 'next/router';
import { VIDEO_LOCATIONS } from '@/shared/constants/main/videoLocations';
import VideoPlayer from '@/pages/main/components/video/videoPlayer';

export default function VideoPlayPage() {
  const router = useRouter();
  const { id } = router.query;
  const location = VIDEO_LOCATIONS.find((loc) => loc.id === Number(id));

  const handleVideoEnd = () => {
    const isHiddenReward = Math.random() < 0.5;

    router.push(isHiddenReward ? '/main/HiddenReward' : '/main/PostCard');
  };

  return (
    <div
      className={cn(
        'relative w-full h-[100vh] flex flex-col items-center pb-[9.5rem]',
        'bg-mint-50'
      )}
      role="main"
      aria-label="명소 영상 재생 페이지"
    >
      <div className="w-full px-[2.4rem] mt-[4.5rem] h-full">
        <VideoPlayer
          src={location?.videoSrc}
          label={location?.label}
          onEnd={handleVideoEnd}
        />
      </div>

      <p
        id="video-description"
        className="mt-[1.4rem] text-mint-700 text-body-lg"
        role="note"
        aria-label="영상 시청 이후 자동 이동 안내"
      >
        영상 시청 이후 자동으로 넘어갑니다.
      </p>
    </div>
  );
}

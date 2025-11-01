import { cn } from '@/shared/lib';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { VIDEO_LOCATIONS } from '@/shared/constants/main/videoLocations';

export default function VideoPlaceholder() {
  const router = useRouter();
  const { label } = router.query;
  const location = VIDEO_LOCATIONS.find((loc) => loc.label === label);

  const handleVideoEnd = () => router.push('/main/HiddenReward');

  return (
    <div
      className={cn(
        'relative w-full h-[100vh] flex flex-col items-center pb-[9.5rem]',
        location ? 'bg-white' : 'bg-mint-50'
      )}
      role="main"
      aria-label="명소 영상 재생 페이지"
    >
      <div className="w-full px-[2.4rem] mt-[4.5rem] h-full">
        <div
          className="relative w-full h-full overflow-hidden"
          role="region"
          aria-label={location ? `${location.label} 영상 플레이어` : '비디오 대기 화면'}
        >
          {location ? (
            <video
              key={location.videoSrc}
              src={location.videoSrc}
              autoPlay
              muted
              playsInline
              controls
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover"
              aria-label={`${location.label} 영상`}
              aria-describedby="video-description"
            />
          ) : (
            <>
              <Image
                src="/assets/checkerBackground.svg"
                alt="비디오가 아직 재생되지 않았습니다."
                fill
                className="object-cover"
                priority
              />
              <span
                className="absolute inset-0 flex justify-center items-center text-gray-800 text-body-md font-medium"
                role="status"
                aria-live="polite"
              >
                Video play
              </span>
            </>
          )}
        </div>
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

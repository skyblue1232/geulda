import Image from 'next/image';

interface VideoPlayerProps {
  src?: string;
  label?: string;
  onEnd: () => void;
}

export default function VideoPlayer({ src, label, onEnd }: VideoPlayerProps) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      aria-label={label ? `${label} 영상 플레이어` : '비디오 대기 화면'}
    >
      {src ? (
        <video
          key={src}
          src={src.trim()}
          preload="auto"         // 초기 버퍼링 줄임
          autoPlay               // 페이지 진입 즉시 재생
          muted                  // iOS 자동재생 조건
          playsInline            // 모바일 강제 전체화면 방지
          controls={false}  
          onEnded={onEnd}
          className="w-full h-full rounded-[2rem] object-cover"
          aria-label={`${label} 영상`}
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
            className="absolute inset-0 flex justify-center items-center text-title-md"
            role="status"
            aria-live="polite"
          >
            Video play
          </span>
        </>
      )}
    </div>
  );
}

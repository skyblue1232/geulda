import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useKakaoCourseMap } from '@/shared/hooks/kakaoMap/useKakaoCourseMap';
import type { CoursePlace } from '@/shared/api/course/types/courseSession';
import { cn } from '@/shared/lib';

interface ResultMapProps {
  sessionId?: string; // sessionId 없으면 버튼 비활성화 시키기 위해서
  places: CoursePlace[]; 
}

export default function ResultMap({ sessionId, places }: ResultMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useKakaoCourseMap(mapRef, {
    places,
    enableClick: false,
  });

  return (
    <section
      className="relative w-full h-[43.6rem] rounded-[2rem] overflow-hidden bg-gray-200"
      role="region"
      aria-label="추천 코스 미리보기 지도"
    >
      <div ref={mapRef} role="application" className="w-full h-full" />

      <button
        onClick={() =>
          router.push(`/map/result/Map?sessionId=${sessionId}`)
        }
        disabled={!sessionId}
        aria-label="전체화면 지도로 보기"
        className={cn(
          "absolute right-[1.2rem] bottom-[1.4rem] z-[9999] bg-pink-200 border border-pink-300 text-white text-title-sm px-[2.2rem] py-[1.2rem] rounded-[2rem]",
          !sessionId && "opacity-50 cursor-not-allowed"
        )}
      >
        전체화면 보기
      </button>
    </section>
  );
}

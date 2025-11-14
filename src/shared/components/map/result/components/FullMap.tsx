import { useRef, useState } from 'react';
import { useCourseSession } from '@/shared/api/course/queries/useCourseSession';
import { useKakaoCourseMap } from '@/shared/hooks/kakaoMap/useKakaoCourseMap';
import LocationBubble from '@/shared/components/container/LocationBubble';
import type { CoursePlace } from '@/shared/api/course/types/courseSession';

interface FullMapProps {
  sessionId: string;
}

export default function FullMap({ sessionId }: FullMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { data } = useCourseSession(sessionId);
  const [selectedPlace, setSelectedPlace] = useState<CoursePlace | null>(null);

  useKakaoCourseMap(mapRef, {
    places: data?.places || [],
    enableClick: true,
    onPinClick: (place) => {
      setSelectedPlace(place);
    },
  });

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="absolute inset-0 w-full h-full bg-gray-200" />

      {selectedPlace && (
        <div
          className="absolute inset-0 z-[2000] flex items-center justify-center bg-black/30"
          onClick={() => setSelectedPlace(null)}
        >
          <div
            className="absolute"
            onClick={(e) => e.stopPropagation()}
          >
            <LocationBubble place={selectedPlace} />
          </div>
        </div>
      )}
    </div>
  );
}

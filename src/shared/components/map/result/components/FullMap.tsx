import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCourseSession } from '@/shared/api/course/queries/useCourseSession';
import { useKakaoCourseMap } from '@/shared/hooks/kakaoMap/useKakaoCourseMap';
import LocationBubble from '@/shared/components/container/LocationBubble';
import type { CoursePlace } from '@/shared/api/course/types/courseSession';

interface FullMapProps {
  sessionId: string;
  onError?: () => void;
}

export default function FullMap({ sessionId, onError }: FullMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { data, isError } = useCourseSession(sessionId);

  const [selectedPlace, setSelectedPlace] = useState<CoursePlace | null>(null);
  const [bubblePos, setBubblePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (isError) onError?.();
  }, [isError, onError]);

  useKakaoCourseMap(mapRef, {
    places: data?.places || [],
    enableClick: true,

    onPinClick: (place) => {
      setSelectedPlace(place);

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetY = 20;

      setBubblePos({
        x: centerX,
        y: centerY - offsetY,
      });
    },
  });

  return (
    <div className="relative w-full h-full">
      {/* 지도 */}
      <div ref={mapRef} className="absolute inset-0 w-full h-full bg-gray-200" />

      {selectedPlace &&
        bubblePos &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/20"
            onClick={() => setSelectedPlace(null)}
          >
            <div
              className="absolute"
              style={{
                top: bubblePos.y,
                left: bubblePos.x,
                transform: 'translate(-50%, -100%)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <LocationBubble place={selectedPlace} />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

'use client';
import { useRef, useState } from 'react';
import { useCourseSession } from '@/shared/api/course/queries/useCourseSession';
import { useKakaoCourseMap } from '@/shared/hooks/kakaoMap/useKakaoCourseMap';
import LocationBubble from '@/shared/components/container/LocationBubble';

interface FullMapProps {
  sessionId: string;
}

export default function FullMap({ sessionId }: FullMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { data } = useCourseSession(sessionId);

  const [selected, setSelected] = useState<string | null>(null);
  const [selectedLoc, setSelectedLoc] = useState<{ lat: number; lng: number } | null>(null);

  useKakaoCourseMap(mapRef, {
    places: data?.places || [],
    enableClick: true,
    onPinClick: (place) => {
      setSelected(place.name);
      setSelectedLoc({ lat: place.latitude, lng: place.longitude });
    },
  });

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="absolute inset-0 w-full h-full bg-gray-200" />

      {selected && selectedLoc && (
        <div
          className="absolute inset-0 z-[2000] flex items-center justify-center bg-black/30"
          onClick={() => setSelected(null)}
        >
          <div
            className="absolute"
            style={{ transform: 'translateY(-60px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <LocationBubble name={selected} />
          </div>
        </div>
      )}
    </div>
  );
}

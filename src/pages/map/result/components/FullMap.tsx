'use client';

import { useRef } from 'react';
import { useKakaoMap } from '@/shared/hooks/kakao/useKakaoMap';
import { MAP_LOCATIONS } from '@/shared/constants/map/result/mapLocations';

export default function FullMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useKakaoMap(mapRef, MAP_LOCATIONS);

  return (
    <div ref={mapRef} className="w-full h-full bg-gray-200 overflow-hidden" />
  );
}

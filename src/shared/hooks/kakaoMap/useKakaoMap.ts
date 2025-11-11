'use client';
import { useEffect } from 'react';
import { loadKakaoSdk } from '@/shared/utils/loadKakaoSdk';

interface Location {
  name: string;
  lat: number;
  lng: number;
}

export function useKakaoMap(
  mapRef: React.RefObject<HTMLDivElement | null>,
  locations: Location[],
) {
  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.warn('Kakao Maps SDK not loaded yet');
        return;
      }

      window.kakao.maps.load(() => {
        new window.kakao.maps.Map(mapRef.current!, {
          center: new window.kakao.maps.LatLng(37.498, 126.783),
          level: 5,
        });
      });
    };

    loadKakaoSdk(initMap);
  }, [mapRef, locations]);
}

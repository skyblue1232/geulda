'use client';

import { useEffect, useRef } from 'react';
import { loadKakaoSdk } from '@/shared/utils/loadKakaoSdk';
import type { CoursePlace } from '@/shared/api/course/types/courseSettion';

interface UseKakaoCourseMapOptions {
  places: CoursePlace[];
  onPinClick?: (place: CoursePlace) => void; 
  enableClick?: boolean;
}

export function useKakaoCourseMap(
  mapRef: React.RefObject<HTMLDivElement | null>,
  { places, onPinClick, enableClick = false }: UseKakaoCourseMapOptions,
) {
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!places?.length) return;

    loadKakaoSdk(() => {
      if (!window.kakao?.maps || !mapRef.current) return;

      window.kakao.maps.load(() => {
        const { maps } = window.kakao;
        const center = new maps.LatLng(places[0].latitude, places[0].longitude);

        const map = new maps.Map(mapRef.current, { center, level: 6 });
        mapInstanceRef.current = map;

        // 핀
        places.forEach((place) => {
          const el = document.createElement('div');
          el.style.cursor = enableClick ? 'pointer' : 'default';
          el.style.display = 'flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
          el.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24">
              <use href="#icon-RedMapPin"></use>
            </svg>
          `;

          const overlay = new maps.CustomOverlay({
            position: new maps.LatLng(place.latitude, place.longitude),
            content: el,
            yAnchor: 1,
          });

          overlay.setMap(map);

          if (enableClick && onPinClick) {
            el.addEventListener('click', () => onPinClick(place));
          }
        });
      });
    });
  }, [places]);

  return mapInstanceRef.current;
}

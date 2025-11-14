'use client';

import { useEffect, useRef } from 'react';
import { loadKakaoSdk } from '@/shared/utils/loadKakaoSdk';
import type { CoursePlace } from '@/shared/api/course/types/courseSession';

interface UseKakaoCourseMapOptions {
  places: CoursePlace[];
  onPinClick?: (place: CoursePlace) => void;
  enableClick?: boolean;
}

export function useKakaoCourseMap(
  mapRef: React.RefObject<HTMLDivElement | null>,
  { places, onPinClick, enableClick = false }: UseKakaoCourseMapOptions
) {
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([]);
  const isAnimatingRef = useRef(false); 

  useEffect(() => {
    if (!places?.length) return;

    loadKakaoSdk(() => {
      if (!window.kakao?.maps || !mapRef.current) return;

      window.kakao.maps.load(() => {
        const { maps } = window.kakao;

        const center = new maps.LatLng(places[0].latitude, places[0].longitude);
        const map = new maps.Map(mapRef.current!, { center, level: 5 });
        mapInstanceRef.current = map;

        places.forEach((place) => {
          const el = document.createElement('div');
          el.style.cursor = enableClick ? 'pointer' : 'default';
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
          overlaysRef.current.push(overlay);

          if (!enableClick) return;

          el.addEventListener('click', () => {
            if (!onPinClick) return;

            const pinLatLng = new maps.LatLng(place.latitude, place.longitude);

            const kakaoMap = map as unknown as {
              getLevel: () => number;
              setLevel: (level: number, opts?: { animate: boolean }) => void;
            };

            const targetLevel = 6;
            const currentLevel = kakaoMap.getLevel();

            const handleAfterZoom = () => {
              maps.event.removeListener(map, 'idle', handleAfterZoom);

              panToOffset(map, pinLatLng);

              const handleAfterPan = () => {
                maps.event.removeListener(map, 'idle', handleAfterPan);
                onPinClick(place);  
              };

              maps.event.addListener(map, 'idle', handleAfterPan);
            };

            if (currentLevel > targetLevel) {
              maps.event.addListener(map, 'idle', handleAfterZoom);
              kakaoMap.setLevel(targetLevel, { animate: true });
            } else {
              handleAfterZoom();
            }
          });

        });
      });
    });

    return () => {
      overlaysRef.current.forEach((o) => o.setMap(null));
      overlaysRef.current = [];
      mapInstanceRef.current = null;
    };
  }, [places, enableClick, mapRef]);

  return mapInstanceRef.current;
}

function panToOffset(map: any, latLng: any) {
  const projection = map.getProjection();
  const point = projection.pointFromCoords(latLng);
  const offsetY = 130;
  const newPoint = new kakao.maps.Point(point.x, point.y - offsetY);
  const newCenter = projection.coordsFromPoint(newPoint);
  map.panTo(newCenter);
}

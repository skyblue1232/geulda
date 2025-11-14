'use client';
import { useEffect, useRef } from 'react';
import { loadKakaoSdk } from '@/shared/utils/loadKakaoSdk';
import type { CoursePlace } from '@/shared/api/course/types/courseSession';

interface UseKakaoCourseMapOptions {
  places: CoursePlace[];
  enableClick?: boolean;
  onPinClick?: (
    place: CoursePlace,
    point: { x: number; y: number }
  ) => void;
}

export function useKakaoCourseMap(
  mapRef: React.RefObject<HTMLDivElement | null>,
  { places, enableClick = false, onPinClick }: UseKakaoCourseMapOptions
) {
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
  const markerOverlaysRef = useRef<kakao.maps.CustomOverlay[]>([]);
  const eventListenersRef = useRef<Array<() => void>>([]); 

  useEffect(() => {
    if (!places?.length) return;

    loadKakaoSdk(() => {
      if (!window.kakao?.maps || !mapRef.current) return;

      window.kakao.maps.load(() => {
        const { maps } = window.kakao;

        const center = new maps.LatLng(
          places[0].latitude,
          places[0].longitude
        );

        const map = new maps.Map(mapRef.current!, {
          center,
          level: 5,
        });

        mapInstanceRef.current = map;

        places.forEach((place) => {
          const el = document.createElement('div');
          el.style.cursor = enableClick ? 'pointer' : 'default';

          el.innerHTML = `
            <svg width="36" height="36" viewBox="0 0 24 24"
                fill="#EB3939"
                stroke="#EB3939"
                xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#a)">
                <path d="M12 1.5a8.26 8.26 0 0 0-8.25 8.25c0 7.06 7.5 12.39 7.82 12.614a.75.75 0 0 0 .86 0c.32-.223 7.82-5.555 7.82-12.614A8.26 8.26 0 0 0 12 1.5m0 5.25a3 3 0 1 1 0 6 3 3 0 0 1 0-6"
                      fill="#EB3939"
                      stroke="#EB3939" />
              </g>
              <defs>
                <clipPath id="a">
                  <path d="M0 0h24v24H0z" />
                </clipPath>
              </defs>
            </svg>
          `;


          const overlay = new maps.CustomOverlay({
            position: new maps.LatLng(place.latitude, place.longitude),
            content: el,
            yAnchor: 1,
          });

          overlay.setMap(map);
          markerOverlaysRef.current.push(overlay);

          if (!enableClick) return;

          const listener = () => {
            if (!mapRef.current) return;

            const pos = new maps.LatLng(place.latitude, place.longitude);
            const proj = map.getProjection();
            const offsetY = 50;
            const p = proj.pointFromCoords(pos);
            const newPoint = new maps.Point(p.x, p.y - offsetY);
            const newCenter = proj.coordsFromPoint(newPoint);

            map.panTo(newCenter);

            // 화면상의 실제 좌표 계산
            const mapRect = mapRef.current.getBoundingClientRect();
            const localPoint = proj.containerPointFromCoords(pos);

            const pageX = mapRect.left + localPoint.x;
            const pageY = mapRect.top + localPoint.y;

            onPinClick?.(place, { x: pageX, y: pageY });
          };

          el.addEventListener('click', listener);

          // cleanup을 위해 remove 함수 저장
          eventListenersRef.current.push(() => {
            el.removeEventListener('click', listener);
          });
        });
      });
    });

    return () => {
      markerOverlaysRef.current.forEach((o) => o.setMap(null));
      markerOverlaysRef.current = [];

      eventListenersRef.current.forEach((remove) => remove());
      eventListenersRef.current = [];
    };
  }, [places, enableClick, mapRef]);

  return mapInstanceRef;
}

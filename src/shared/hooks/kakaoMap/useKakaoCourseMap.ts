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
          markerOverlaysRef.current.push(overlay);

          if (!enableClick) return;

          el.addEventListener('click', () => {
            if (!mapRef.current) return;

            const pos = new maps.LatLng(place.latitude, place.longitude);
            const proj = map.getProjection();

            const offsetY = 40;
            const p = proj.pointFromCoords(pos);
            const newPoint = new maps.Point(p.x, p.y - offsetY);
            const newCenter = proj.coordsFromPoint(newPoint);

            map.panTo(newCenter);

            const mapRect = mapRef.current.getBoundingClientRect();
            const localPoint = proj.containerPointFromCoords(pos);

            const pageX = mapRect.left + localPoint.x;
            const pageY = mapRect.top + localPoint.y;

            onPinClick?.(place, {
              x: pageX,
              y: pageY,
            });
          });
        });
      });
    });

    return () => {
      markerOverlaysRef.current.forEach((o) => o.setMap(null));
      markerOverlaysRef.current = [];
    };
  }, [places, enableClick, mapRef]);

  return mapInstanceRef.current;
}

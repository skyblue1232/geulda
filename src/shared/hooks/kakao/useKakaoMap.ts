'use client';
import { useEffect } from 'react';
import { loadKakaoSdk } from '@/shared/utils/loadKakaoSdk';

interface Location {
  name: string;
  lat: number;
  lng: number;
}

export function useKakaoMap(mapRef: React.RefObject<HTMLDivElement | null>, locations: Location[]) {
  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      const kakao = (window as any).kakao;
      if (!kakao) return;

      kakao.maps.load(() => {
        const map = new kakao.maps.Map(mapRef.current!, {
          center: new kakao.maps.LatLng(37.498, 126.783),
          level: 5,
        });

        locations.forEach((p) => {
          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(p.lat, p.lng),
            map,
          });

          const infoWindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px 10px; font-size:12px;">${p.name}</div>`,
          });

          kakao.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(map, marker);
          });
        });
      });
    };

    loadKakaoSdk(initMap);
  }, [mapRef, locations]);
}

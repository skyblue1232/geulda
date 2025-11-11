declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      function load(callback: () => void): void;

      class Map {
        constructor(container: HTMLElement, options?: object);
        setCenter(latlng: LatLng): void;
        setLevel(level: number): void;
      }

      class LatLng {
        constructor(lat: number, lng: number);
      }

      class CustomOverlay {
        constructor(options: {
          position: LatLng;
          content: HTMLElement | string;
          yAnchor?: number;
        });
        setMap(map: Map | null): void;
      }
    }
  }
}

export {};

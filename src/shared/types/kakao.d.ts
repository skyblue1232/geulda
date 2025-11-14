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
        getProjection(): Projection;
        panTo(latlng: LatLng): void;
      }

      class LatLng {
        constructor(lat: number, lng: number);
      }

      class Point {
        constructor(x: number, y: number);
        x: number;
        y: number;
      }

      interface Projection {
        pointFromCoords(latlng: LatLng): Point;
        coordsFromPoint(point: Point): LatLng;
      }

      class CustomOverlay {
        constructor(options: {
          position: LatLng;
          content: HTMLElement | string;
          yAnchor?: number;
        });
        setMap(map: Map | null): void;
      }

      namespace event {
        
        function addListener(
          target: any,
          type: string,
          handler: (...args: any[]) => void
        ): void;

        function removeListener(
          target: any,
          type: string,
          handler: (...args: any[]) => void
        ): void;

        function removeListener(
          target: any,
          type: string
        ): void;
      }
    }
  }
}

export {};

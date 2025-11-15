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
        setLevel(level: number, options?: { animate?: boolean }): void;
        getLevel(): number;
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

        containerPointFromCoords(latlng: LatLng): Point;

        coordsFromContainerPoint(point: Point): LatLng;
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

        type EventTarget = Map | CustomOverlay | HTMLElement | null;
        type EventHandler = (...args: unknown[]) => void;

        function addListener(
          target: EventTarget,
          type: string,
          handler: EventHandler
        ): void;

        function removeListener(
          target: EventTarget,
          type: string,
          handler: EventHandler
        ): void;

        function removeListener(
          target: EventTarget,
          type: string
        ): void;
      }
    }
  }
}

export {};

// src/shared/utils/getLocation.ts
export const getLocation = (
  onSuccess: (pos: GeolocationPosition) => void,
  onError?: (err: GeolocationPositionError) => void,
) => {
  if (!navigator.geolocation) {
    console.error('❌ 현재 브라우저에서 위치 정보 사용이 불가능합니다.');
    return;
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });
};

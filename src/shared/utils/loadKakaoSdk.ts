export function loadKakaoSdk(callback: () => void) {
  const scriptId = 'kakao-map-sdk';
  const existing = document.getElementById(scriptId);
  const appKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY; 
  
  if (!appKey) {
    console.error('NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY is not defined');
    return;
  }

  if (existing) {
    callback();
    return;
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
  script.async = true;
  script.onload = callback;
  document.head.appendChild(script);
}

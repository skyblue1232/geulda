import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const isBrowser =
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const getAccessToken = () =>
  isBrowser ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
export const getRefreshToken = () =>
  isBrowser ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;

export const setTokens = (accessToken: string, refreshToken: string) => {
  if (!isBrowser) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = () => {
  if (!isBrowser) return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getMemberIdFromToken = (): number | null => {
  if (!isBrowser) return null;

  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return null;

  try {
    const decoded: { memberId?: number; sub?: number; id?: number } =
      jwtDecode(token);
    return decoded.memberId ?? decoded.sub ?? decoded.id ?? null;
  } catch (err) {
    console.error('JWT decode 실패:', err);
    return null;
  }
};

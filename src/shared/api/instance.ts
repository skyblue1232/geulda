import axios, { AxiosError } from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from '@/shared/utils/token';
import type { ApiResponse, TokenData } from '@/shared/api/types';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

//토큰이 필요한 요청용 인스턴스
export const apiWithToken = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 토큰이 필요 없는 요청용 인스턴스
export const apiAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터 - 액세스 토큰 첨부
apiWithToken.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터 - 토큰 재발급 처리
let isRefreshing = false;
let failedQueue: {
  resolve: (token?: string) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token ?? '');
  });
  failedQueue = [];
};

apiWithToken.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse<unknown>>) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token?: string) => {
              originalRequest.headers.Authorization = 'Bearer ' + token;
              resolve(apiWithToken(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // refreshToken 가져옴
        const refreshToken = getRefreshToken();

        const { data } = await axios.post<ApiResponse<TokenData>>(
          `${BASE_URL}/api/auth/token/refresh`,
          { refreshToken },
          { withCredentials: true },
        );

        const { accessToken, refreshToken: newRefresh } = data.data;
        setTokens(accessToken, newRefresh);

        apiWithToken.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
        processQueue(null, accessToken);

        return apiWithToken(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

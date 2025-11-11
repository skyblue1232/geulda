import { apiWithToken } from './instance';
import type { ApiResponse } from '@/shared/types/authtypes';
import type { MyPageResponse } from '@/shared/types/membertypes';

export const fetchMyPage = async (): Promise<ApiResponse<MyPageResponse>> => {
  try {
    const res = await apiWithToken.get<ApiResponse<MyPageResponse>>(
      '/api/members/mypage',
    );
    console.log('/api/members/mypage response:', res.data);
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.error('fetchMyPage error:', err.message);
    }
    throw err;
  }
};

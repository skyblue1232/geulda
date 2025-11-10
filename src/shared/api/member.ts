import { apiWithToken } from './instance';
import type { ApiResponse } from '@/shared/types/authtypes';

export const fetchMyPage = async () => {
  try {
    const res = await apiWithToken.get<ApiResponse<any>>('/api/members/mypage');
    console.log('/api/members/mypage response:', res.data);
    return res.data;
  } catch (err: any) {
    console.error('fetchMyPage error:', err.response?.data || err);
    throw err;
  }
};

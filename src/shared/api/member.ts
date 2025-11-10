import { apiWithToken } from '@/shared/api/instance';

export const fetchMyPage = async () => {
  const res = await apiWithToken.get('/api/members/mypage');
  return res.data?.data;
};

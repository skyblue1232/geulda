import { apiWithToken } from './instance';
import type { ApiResponse } from '@/shared/types/authtypes';
import type { MyPageResponse } from '@/shared/types/membertypes';
import { useQuery } from '@tanstack/react-query';

export const fetchMyPage = async (): Promise<ApiResponse<MyPageResponse>> => {
  const res = await apiWithToken.get<ApiResponse<MyPageResponse>>(
    '/api/members/mypage',
  );
  return res.data;
};

export const useMyPageQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['myPage'],
    queryFn: fetchMyPage,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

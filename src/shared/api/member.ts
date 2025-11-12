import { apiWithToken } from '@/shared/api/instance';
import type { ApiResponse } from '@/shared/types/authtypes';
import type { MyPageResponse , MemberMeResponse } from '@/shared/types/membertypes';
import { useQuery } from '@tanstack/react-query';

export const fetchMyPage = async (): Promise<MyPageResponse> => {
  const res = await apiWithToken.get<ApiResponse<MyPageResponse>>(
    '/api/members/mypage',
  );
  return res.data.data;
};

export const fetchMyInfo = async (): Promise<ApiResponse<MemberMeResponse>> => {
  const res = await apiWithToken.get<ApiResponse<MemberMeResponse>>('/api/members/me');
  return res.data;
};

export const useMyPageQuery = (enabled: boolean) =>
  useQuery({
    queryKey: ['myPage'],
    queryFn: fetchMyPage,
    enabled,
    staleTime: 1000 * 60 * 5,
  });

  export const useMyInfoQuery = (enabled: boolean) =>
  useQuery({
    queryKey: ['myInfo'],
    queryFn: fetchMyInfo,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
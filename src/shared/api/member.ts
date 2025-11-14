import { apiWithToken } from '@/shared/api/instance';
import type { ApiResponse } from '@/shared/types/authtypes';
import type {
  MyPageResponse,
  MemberMeResponse,
  PostCardDetailResponse,
} from '@/shared/types/membertypes';
import { useQuery } from '@tanstack/react-query';

export const fetchMyPage = async (): Promise<MyPageResponse> => {
  const res = await apiWithToken.get<ApiResponse<MyPageResponse>>(
    '/api/members/mypage',
  );
  return res.data.data;
};

export const fetchMyInfo = async (): Promise<ApiResponse<MemberMeResponse>> => {
  const res = await apiWithToken.get<ApiResponse<MemberMeResponse>>(
    '/api/members/me',
  );
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

export const getPostCardDetail = async (postcardId: number) => {
  const { data } = await apiWithToken.get<ApiResponse<PostCardDetailResponse>>(
    `/api/postcards/${postcardId}`,
  );
  return data;
};

export const useGetPostCardDetail = (postcardId?: number) => {
  return useQuery({
    queryKey: ['postcardDetail', postcardId],
    queryFn: () => getPostCardDetail(postcardId!),
    enabled: !!postcardId,
  });
};

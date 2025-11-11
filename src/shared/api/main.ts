import { apiAuth } from '@/shared/api/instance';
import type { ApiResponse } from '@/shared/types/authtypes';

export interface StampStatus {
  totalStampCount: number;
  collectedStampCount: number;
  stampIds: number[];
}

/**
 * 스탬프 수집 현황 조회 API
 * 비로그인 사용자도 접근 가능
 */
export const getStampStatus = async (): Promise<StampStatus> => {
  const { data } = await apiAuth.get<ApiResponse<StampStatus>>(
    '/api/stamps/status',
  );
  return data.data;
};

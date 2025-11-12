import { apiAuth } from '@/shared/api/instance';
import type { ApiResponse } from '@/shared/types/authtypes';

export interface StampStatus {
  totalStampCount: number;
  collectedStampCount: number;
  stampIds: number[];
}

export const getStampStatus = async (): Promise<StampStatus> => {
  const { data } = await apiAuth.get<ApiResponse<StampStatus>>(
    '/api/stamps/collection',
  );
  return data.data;
};

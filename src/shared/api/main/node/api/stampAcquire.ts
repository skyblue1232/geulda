import { apiWithToken } from '@/shared/api/instance';
import type { StampAcquireRequest, StampAcquireResponse } from '@/shared/api/main/node/types/stampAcquireTypes';

export const postStampAcquire = async (
  placeId: number,
  body: StampAcquireRequest,
): Promise<StampAcquireResponse> => {
  const res = await apiWithToken.post<StampAcquireResponse>(
    `/api/stamps/${placeId}/acquire`,
    body,
  );
  return res.data;
};

import { useMutation } from '@tanstack/react-query';
import { postStampAcquire } from '@/shared/api/main/node/api/stampAcquire';
import type { StampAcquireRequest, StampAcquireResponse } from '@/shared/api/main/node/types/stampAcquireTypes';

export const useStampAcquire = () => {
  return useMutation<StampAcquireResponse, Error, { placeId: number; body: StampAcquireRequest }>({
    mutationFn: ({ placeId, body }) => postStampAcquire(placeId, body),
  });
};

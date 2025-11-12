// /shared/main/queries/useGetPlaceDetail.ts
import { useQuery } from '@tanstack/react-query';
import { getPlaceDetail } from '../api/getPlaceDetail';

export const useGetPlaceDetail = (placeId?: number, memberId?: number) => {
  return useQuery({
    queryKey: ['placeDetail', placeId, memberId],
    queryFn: () => getPlaceDetail(placeId!, memberId!),
    enabled: !!placeId && !!memberId, // 둘 다 있어야 실행
  });
};

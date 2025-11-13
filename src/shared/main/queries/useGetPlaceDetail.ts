import { useQuery } from '@tanstack/react-query';
import { getPlaceDetail } from '../api/getPlaceDetail';

export const useGetPlaceDetail = (placeId?: number) => {
  return useQuery({
    queryKey: ['placeDetail', placeId],
    queryFn: () => getPlaceDetail(placeId!),
    enabled: !!placeId, // placeId가 있을 때만 실행
  });
};

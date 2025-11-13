import { useQuery } from '@tanstack/react-query';
import { getHasBoardStamp } from '@/shared/main/api/getHasBoardStamp';

export const useGetHasBoardStamp = () => {
  return useQuery({
    queryKey: ['boardStamp'],
    queryFn: getHasBoardStamp,
  });
};

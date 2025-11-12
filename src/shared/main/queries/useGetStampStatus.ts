import { useQuery } from '@tanstack/react-query';
import { getStampStatus } from '@/shared/main/getStampStatus';

/**
 * 스탬프 수집 현황 조회
 * - 비로그인도 가능
 */

export const useGetStampStatus = () => {
  return useQuery({
    queryKey: ['stampStatus'],
    queryFn: getStampStatus,
  });
};

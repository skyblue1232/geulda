// 📁 src/shared/query/stamp/useGetStampStatus.ts
import { useQuery } from '@tanstack/react-query';
import { getStampStatus } from '@/shared/api/main';

/**
 * 스탬프 수집 현황 조회 훅
 * - 비로그인도 가능
 * - 5분 캐싱 유지
 */
export const useGetStampStatus = () => {
  return useQuery({
    queryKey: ['stampStatus'],
    queryFn: getStampStatus,
    staleTime: 1000 * 60 * 5,
  });
};

import { useQuery } from '@tanstack/react-query';
import { getCourseSession } from '@/shared/api/course/api/getCourseSettion';
import type { CourseSessionResponse } from '@/shared/api/course/types/courseSettion';

export const useCourseSession = (sessionId: string) => {
  return useQuery<CourseSessionResponse['result']>({
    queryKey: ['courseSession', sessionId],
    queryFn: () => getCourseSession(sessionId),
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: true, 
    refetchOnReconnect: true,   
    refetchInterval: false, 
  });
};

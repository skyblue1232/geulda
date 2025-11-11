import { apiAuth } from "@/shared/api/instance";
import type { CourseSessionResponse } from "@/shared/api/course/types/courseSession";

export const getCourseSession = async (sessionId: string) => {
  const { data } = await apiAuth.get<CourseSessionResponse>(
    `/api/courses/session/${sessionId}`,
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch course session');
  }
  
  return data.result;
};

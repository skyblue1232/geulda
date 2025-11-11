import { apiAuth } from "@/shared/api/instance";
import type { CourseSessionResponse } from "@/shared/api/course/types/courseSettion";

export const getCourseSession = async (sessionId: string) => {
  const { data } = await apiAuth.get<CourseSessionResponse>(
    `/api/courses/session/${sessionId}`,
  );
  return data.result;
};

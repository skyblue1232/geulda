import { apiWithToken } from "@/shared/api/instance";
import type { CourseSessionResponse } from "@/shared/api/course/types/courseSession";

export const getCourseSession = async (sessionId: string) => {
  const { data } = await apiWithToken.get<CourseSessionResponse>(
    `/api/courses/session/${sessionId}`,
  );

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch course session");
  }

  return data.data;
};

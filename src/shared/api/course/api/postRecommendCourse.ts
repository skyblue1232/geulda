import { apiWithToken } from '@/shared/api/instance';
import type {
  RecommendCourseRequest,
  RecommendCourseResponse,
} from '@/shared/api/course/types/recommendTypes';

export const postRecommendCourse = async (body: RecommendCourseRequest) => {
  const { data } = await apiWithToken.post<RecommendCourseResponse>(
    '/api/courses/recommend',
    body,
  );
  return data;
};

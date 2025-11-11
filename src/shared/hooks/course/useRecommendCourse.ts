import { useMutation } from '@tanstack/react-query';
import {
  postRecommendCourse,
} from '@/shared/api/course/api/postRecommendCourse';
import type {
  RecommendCourseRequest,
  RecommendCourseResponse,
} from '@/shared/api/course/types/recommendTypes';

export const useRecommendCourse = () => {
  return useMutation<RecommendCourseResponse, Error, RecommendCourseRequest>({
    mutationFn: (body) => postRecommendCourse(body),
  });
};

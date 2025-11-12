import { apiAuth } from '@/shared/api/instance';

// 응답 타입 정의
export interface Place {
  placeId: number;
  name: string;
  hasStamp: boolean;
}

export interface StampStatusResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    places: Place[];
  };
}

/**
 * 스탬프 수집 현황 조회 API (비로그인 접근 가능)
 */
export const getHasBoardStamp = async (): Promise<StampStatusResponse> => {
  const { data } = await apiAuth.get<StampStatusResponse>('/api/places');
  return data;
};

import { apiAuth } from '@/shared/api/instance';
import type { ApiResponse } from '@/shared/types/authtypes';

interface PlaceDetailResponse {
  placeId: number;
  isCompleted: boolean;
  imageUrl: string;
  placeName: string;
  description: string;
  address: string;
}

// ✅ memberId를 query 파라미터로 추가
export const getPlaceDetail = async (placeId: number, memberId: number) => {
  const { data } = await apiAuth.get<ApiResponse<PlaceDetailResponse>>(
    `/api/places/${placeId}`,
    {
      params: { memberId },
    },
  );
  return data;
};

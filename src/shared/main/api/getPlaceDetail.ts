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

export const getPlaceDetail = async (placeId: number) => {
  const { data } = await apiAuth.get<ApiResponse<PlaceDetailResponse>>(
    `/api/places/${placeId}`,
  );
  return data;
};

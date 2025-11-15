import { apiWithToken } from '@/shared/api/instance';

export interface Place {
  placeId: number;
  name: string;
  hasStamp: boolean;
}

export interface StampStatusResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    places: Place[];
  };
}

export const getHasBoardStamp = async (): Promise<StampStatusResponse> => {
  const { data } = await apiWithToken.get<StampStatusResponse>('/api/places');
  return data;
};

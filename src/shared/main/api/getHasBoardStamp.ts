import { apiAuth } from '@/shared/api/instance';

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

export const getHasBoardStamp = async (): Promise<StampStatusResponse> => {
  const { data } = await apiAuth.get<StampStatusResponse>('/api/places');
  return data;
};

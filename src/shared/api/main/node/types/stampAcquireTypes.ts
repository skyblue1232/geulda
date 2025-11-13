export interface StampAcquireRequest {
  latitude: number;
  longitude: number;
}

export interface PostcardData {
  imageUrl: string;
  placeName: string;
  description: string;
  address: string;
  hidden: boolean;
}

export interface StampAcquireResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    stampId: number;
    memberId: number;
    video?: string;
    systemMessage: string;
    postcard: PostcardData;
  };
  timestamp: string;
}

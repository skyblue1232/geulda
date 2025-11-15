export interface MyPageResponse {
  memberId: number;
  name: string;
  profileImageUrl: string;
   bookmarkedEvents: {
    eventId: number;
    title?: string;
    body?: string;
    address?: string;
    imageUrl?: string;
    eventName?: string;
    eventImageUrl?: string;
  }[];
  postcards: {
    postcardId: number;
    imageUrl: string;
    placeName: string;
  }[];
}

export interface MemberMeResponse {
  id: number;
  email: string;
  name: string;
  profileImageUrl: string;
  provider: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostCardDetailResponse {
  postcardId: number;
  imageUrl: string;
  placeName: string;
  placeDescription: string;
}

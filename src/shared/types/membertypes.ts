export interface MyPageResponse {
  profile: {
    id: number;
    email: string;
    name: string;
    profileImageUrl: string;
  };
  bookmarkedEvents: {
    eventId: number;
    eventName: string;
    eventImageUrl: string;
  }[];
  postcards: {
    postcardId: number;
    imageUrl: string;
    placeName: string;
  }[];
}
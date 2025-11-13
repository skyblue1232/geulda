export interface EventResponse {
  eventId: number;
  title: string;
  body: string;
  address?: string;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  isBookmarked?: boolean;
}
export interface EventData {
  id: number;
  name: string;
  description: string;
  address: string;
  startDate: string;
  endDate: string;
  imageSrc: string;
  liked: boolean;
}

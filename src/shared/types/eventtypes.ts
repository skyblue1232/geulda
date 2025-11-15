export interface EventResponse {
  eventId: number;
  title: string;
  body: string;
  address?: string;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
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

export interface RelatedEvent {
  eventId: number;
  title: string;
  imageUrl: string;
}

export interface EventDetailResponse {
  success: boolean;
  code: string;
  message: string;
  data: EventDetail;
  timestamp: string;
}

export interface EventDetail extends EventResponse {
  externalUrl?: string;
  nextEvents: RelatedEvent[];
}

export type RelatedEventOrEmpty = RelatedEvent | { isEmpty: true };
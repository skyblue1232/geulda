import { EventData, EventResponse } from '@/shared/types/eventtypes';

export const mapEvent = (item: EventResponse): EventData => ({
  id: item.eventId,
  name: item.title,
  description: item.body,
  address: item.address ?? '',
  startDate: item.startDate ?? '',
  endDate: item.endDate ?? '',
  imageSrc: item.thumbnailUrl ?? item.imageUrl ?? '',
  liked: item.isBookmarked ?? false,
});

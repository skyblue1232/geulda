'use client';

import { useQuery } from '@tanstack/react-query';
import { apiAuth } from '@/shared/api/instance';
import type {
  EventDetailResponse,
  EventDetail,
} from '@/shared/types/eventtypes';

const fetchEventDetail = async (eventId: number): Promise<EventDetail> => {
  const res = await apiAuth.get<EventDetailResponse>(`/api/events/${eventId}`);
  return res.data.data;
};

export const useEventDetail = (eventId: number) => {
  return useQuery({
    queryKey: ['eventDetail', eventId],
    queryFn: () => fetchEventDetail(eventId),
    enabled: !!eventId,
  });
};

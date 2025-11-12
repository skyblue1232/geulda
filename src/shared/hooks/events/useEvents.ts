'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@/shared/api/events/event';
import { formatDateToISO } from '@/shared/utils/date';
import { getMemberIdFromToken } from '@/shared/utils/token';

export const useEvents = (date?: Date) => {
  const formattedDate = formatDateToISO(date);
  const memberId = getMemberIdFromToken();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['events', formattedDate, memberId],
    queryFn: () => fetchEvents(formattedDate!, memberId!),
    enabled: !!formattedDate && !!memberId,
  });

  return {
    events: data?.data || [],
    isLoading,
    isError,
  };
};

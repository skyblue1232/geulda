'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@/shared/api/events/event';
import { formatDateToISO } from '@/shared/utils/date';

export const useEvents = (date?: Date) => {
  const formattedDate = formatDateToISO(date);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['events', formattedDate],
    queryFn: () => fetchEvents(formattedDate!),
    enabled: !!formattedDate,
  });

  return {
    events: data?.data || [],
    isLoading,
    isError,
  };
};

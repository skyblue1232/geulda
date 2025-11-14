import type { RelatedEvent } from '@/shared/types/eventtypes';

export const buildNextEventList = (nextEvents: RelatedEvent[]) => {
  const MAX = 2;

  if (nextEvents.length >= MAX) return nextEvents.slice(0, MAX);

  const emptyItems = Array(MAX - nextEvents.length).fill({ isEmpty: true });

  return [...nextEvents, ...emptyItems];
};

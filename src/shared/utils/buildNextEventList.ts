import type { RelatedEvent } from '@/shared/types/eventtypes';

type RelatedEventOrEmpty = RelatedEvent | { isEmpty: true };

export const buildNextEventList = (
  nextEvents: RelatedEvent[],
): RelatedEventOrEmpty[] => {
  const MAX = 2;

  if (nextEvents.length >= MAX) return nextEvents.slice(0, MAX);

  const emptyItems: RelatedEventOrEmpty[] = Array(MAX - nextEvents.length).fill(
    { isEmpty: true },
  );

  return [...nextEvents, ...emptyItems];
};

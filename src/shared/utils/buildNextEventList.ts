import type { RelatedEvent } from '@/shared/types/eventtypes';

export const buildNextEventList = (nextEvents: RelatedEvent[]) => {
  const MAX = 2;
  const count = nextEvents.length;

  if (count >= MAX) return nextEvents.slice(0, MAX);

  const emptyCount = MAX - count;
  const emptyItems = Array(emptyCount).fill({ isEmpty: true });

  return [...nextEvents, ...emptyItems];
};

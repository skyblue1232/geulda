'use client';
import { cn } from '@/shared/lib';
import { LocationCard } from '@/shared/components';
import type { CoursePlace } from '@/shared/api/course/types/courseSession';

interface ResultListProps {
  places: CoursePlace[];
}

export default function ResultList({ places }: ResultListProps) {
  return (
    <div
      role="list"
      aria-label="추천 결과 리스트"
      className={cn(
        'grid grid-cols-2 gap-[1.2rem] w-full justify-items-center pb-[15rem]',
        'overflow-y-scroll no-scrollbar'
      )}
    >
      {places.length > 0 ? (
        places.map((place) => (
          <div role="listitem" key={place.placeId ?? place.name} className="w-full">
            <LocationCard
              name={place.name}
              address={place.address}
              description={place.description}
              variant="gray"
              size="medium"
              imageSrc={place.placeImg}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-body-sm text-center w-full">
          표시할 장소가 없습니다.
        </p>
      )}
    </div>
  );
}

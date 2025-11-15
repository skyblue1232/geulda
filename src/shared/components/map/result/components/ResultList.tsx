'use client';
import { cn } from '@/shared/lib';
import { LocationCard } from '@/shared/components';
import type { CoursePlace } from '@/shared/api/course/types/courseSession';
import { useRouter } from 'next/router';

interface ResultListProps {
  places: CoursePlace[];
}

export default function ResultList({ places }: ResultListProps) {
  const router = useRouter();

  const handleClick = (place: CoursePlace) => {
    router.push({
      pathname: `/map/location/${place.placeId}`,
      query: {
        name: place.name,
        address: place.address,
        description: place.description,
        imageSrc: place.placeImg,
      },
    });
  };

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
          <div
            key={place.placeId}
            role="listitem"
            className="w-full cursor-pointer"
            onClick={() => handleClick(place)}
          >
            <LocationCard
              name={place.name}
              address={place.address}
              description={place.description}
              imageSrc={place.placeImg}
              variant="gray"
              size="medium"
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

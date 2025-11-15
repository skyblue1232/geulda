import { Icon } from '@/shared/icons';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { CoursePlace } from '@/shared/api/course/types/courseSession';

interface LocationBubbleProps {
  place: CoursePlace;   // 🔥 place 통째로 받기
  className?: string;
}

const bubbleVariants = cva(
  'relative flex flex-col w-[20.4rem] h-[15.5rem] px-[1.1rem] pt-[1.35rem] bg-white rounded-[2rem] shadow-[0_0.7rem_0.7rem_0_rgba(0,0,0,0.25)]',
);

const LocationBubble = ({ place, className }: LocationBubbleProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: `/map/location/${place.placeId}`,
      query: {
        name: place.name,
        imageSrc: place.placeImg,
        address: place.address,
        description: place.description,
      },
    });
  };

  return (
    <div onClick={handleClick} className={cn(bubbleVariants(), className)}>
      {/* 사진 */}
      <div className="relative h-[10.3rem] w-full rounded-[0.8rem] overflow-hidden">
        {place.placeImg ? (
          <Image
            src={place.placeImg}
            alt={place.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 204px"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200" />
        )}
      </div>

      {/* 이름 */}
      <div className="flex items-center justify-between w-full mt-[0.6rem]">
        <div className="flex items-center gap-[0.6rem] min-w-0">
          <Icon name="MapPin" size={24} color="gray-300" />
          <span className="text-label-lg truncate">{place.name}</span>
        </div>

        <div className="flex-shrink-0">
          <Icon name="backto" size={24} color="gray-300" rotate={180} />
        </div>
      </div>

      {/* 꼬리 */}
      <div
        className="
          absolute left-1/2 -bottom-[1.8rem] -translate-x-1/2
          w-[2.4rem] h-[2.7rem] bg-white
          rounded-b-[2rem]
          [clip-path:polygon(50%_100%,68%_88%,100%_30%,0_30%,32%_88%)]
        "
      />
    </div>
  );
};

export default LocationBubble;

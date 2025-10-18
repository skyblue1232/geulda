import { Icon } from '@/shared/icons';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface LocationBubbleProps {
  name: string;
  imageSrc?: string;
  className?: string;
}

const bubbleVariants = cva(
  'relative flex flex-col w-[20.4rem] h-[15.5rem] px-[1.1rem] pt-[1.35rem] bg-white rounded-[2rem] shadow-[0_0.7rem_0.7rem_0_rgba(0,0,0,0.25)]',
);

const LocationBubble = ({ name, imageSrc, className }: LocationBubbleProps) => {

  const router = useRouter();
  // 말풍선 클릭시 - 장소 세부 페이지로 이동
  // 추후 페이지 작업시 맞는 경로 바꾸면 됩니다.
  const handleClick = () => {
    router.push('/location');
  };

  return (
    <div className={cn(bubbleVariants(), className)}>
      {/* 장소 사진 */}
      <div className='relative h-[10.3rem] w-full rounded-[0.8rem] overflow-hidden'>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 204px'
            loading='lazy'
          />
        ) : (
          <div className='absolute inset-0 bg-gray-200' />
        )}
      </div>

      {/* 지도핀 + 장소 이름 + 아이콘 */}
      <div className='flex items-center justify-between w-full mt-[0.6rem]'>
        <div className='flex items-center gap-[0.6rem] min-w-0'>
          <Icon name='MapPin' size={24} color='gray-300' />
          <span className='text-label-lg truncate'>{name}</span>
        </div>

        <div className='flex-shrink-0'>
          <Icon
            name='backto'
            size={24}
            color='gray-300'
            className='rotate-180'
          />
        </div>
      </div>

      {/* 말풍선 꼬리 */}
      <div
        className='
          absolute left-1/2 -bottom-[1.8rem] -translate-x-1/2
          w-[2.4rem] h-[2.7rem] bg-white
          rounded-b-[2rem]
          [clip-path:polygon(50%_100%,68%_88%,100%_30%,0_30%,32%_88%)]
        '
      />
    </div>
  );
};

export default LocationBubble;

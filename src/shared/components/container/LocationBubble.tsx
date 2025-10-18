import { Icon } from '@/shared/icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import Image from 'next/image';


interface LocationBubbleProps {
  name: string;
   imageSrc?: string;
    className?: string;
}


const bubbleVariants = cva(
  'relative flex flex-col w-[20.4rem] h-[17.25rem] bg-white rounded-[2rem] shadow-[0_4px_7px_0_rgba(0,0,0,0.30)] overflow-hidden',
);

const LocationBubble = ({ name, imageSrc, className }: LocationBubbleProps) => {
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
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 204px'
            loading='lazy'
          />
        ) : (
          <div className='absolute inset-0 bg-gray-200' />
        )}
      </div>

      {/* 지도핀 + 장소 이름  + 뒤로가기아이콘 영역 */}
      <div className='flex items-center justify-between px-[1.1rem] py-[0.6rem]'>
        <div className='flex items-center gap-[0.6rem]'>
          <Icon name='MapPin' size={24} color='gray-200' />
          <span className='text-label-lg truncate'>{name}</span>
        </div>

        <Icon name='backto' size={24} color='gray-300' className='rotate-180'/>
      </div>

      {/* 꼬리 */}
      <div
        className='absolute left-1/2 -bottom-[1rem] -translate-x-1/2 w-0 h-0
          border-l-[1.2rem] border-l-transparent
          border-r-[1.2rem] border-r-transparent
          border-t-[1.2rem] border-t-white
          drop-shadow-[0_4px_7px_rgba(0,0,0,0.3)]'
      />
    </div>
  );
};

export default LocationBubble;
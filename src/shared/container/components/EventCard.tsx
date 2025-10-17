import { Icon } from '@/shared/icons';
import { Card } from '@/shared/container/components/Card';
import { cn } from '@/shared/lib';
import Image from 'next/image';

interface EventCardProps {
  name: string;
  address: string;
  description: string;
  variant?: 'gray' | 'mint';
  size?: 'medium' | 'large';
imageSrc?: string;
}

const EventCard = ({
  name,
  address,
  description,
  variant = 'gray',
  size = 'medium',
  imageSrc = '',
}: EventCardProps) => {
  return (
    <Card
      variant={variant}
      size={size}
      customHeight={size === 'large' ? '13rem' : undefined}
    >
      {/* Medium 카드 */}
      {size === 'medium' ? (
        <div className='flex flex-col justify-between w-full'>
          {/* 행사 사진 */}
          <div className="w-full h-[9rem] rounded-[2rem] mb-[1rem] overflow-hidden">
          <Image
              src={imageSrc}
              alt={name}
              width={142} 
              height={90}
              className="object-cover w-full h-full"
            />
          </div>
          {/* 행사 이름 + 하트 */}
          <div className='flex items-center justify-between w-full mb-[0.2rem]'>
            <span
              className={cn(
                'text-label-lg',
                variant === 'mint' ? 'text-mint-800' : 'text-gray-900',
              )}
            >
              {name}
            </span>
            <Icon
              name='HeartStraight'
              size={20}
              color={variant === 'mint' ? 'mint-400' : 'gray-300'}
            />
          </div>
          {/* 행사 주소 */}
          <div
            className={cn(
              'text-body-md',
              variant === 'mint' ? 'text-mint-500' : 'text-gray-500',
            )}
          >
            {address}
          </div>
        </div>
      ) : (
        // Large 카드
        <div className='flex items-start justify-between w-full gap-[1.2rem]'>
          {/* 행사 이미지 */}
         <div className="relative w-[14.2rem] h-[10rem] rounded-[2rem] flex-shrink-0 overflow-hidden">
  <Image
    src={imageSrc}
    alt={name}
    fill
    className="object-cover w-full h-full"
  />
</div>


          {/* 행사 제목 + 하트 */}
          <div className='flex flex-col justify-between flex-1'>
            <div className='flex items-start justify-between w-full'>
              <span
                className={cn(
                  'text-label-lg',
                  variant === 'mint' ? 'text-mint-800' : 'text-gray-900',
                )}
              >
                {name}
              </span>
              <Icon
                name='HeartStraight'
                size={20}
                color={variant === 'mint' ? 'mint-400' : 'gray-300'}
              />
            </div>

            {/* 행사 설명 */}
            <p
              className={cn(
                'text-body-md mt-[1rem]',
                variant === 'mint' ? 'text-mint-500' : 'text-gray-500',
              )}
            >
              {description}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default EventCard;

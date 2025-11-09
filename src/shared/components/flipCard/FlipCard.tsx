'use client';
import { useState } from 'react';
import Image from 'next/image';

interface FlipCardProps {
  frontSrc: string;
  backSrc: string;
  width?: number;
  height?: number;
}

const FlipCard = ({
  frontSrc,
  backSrc,
  width = 354,
  height = 220,
}: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? '엽서 뒷면 보기' : '엽서 앞면 보기'}
      aria-pressed={isFlipped}
      className='relative flex justify-center items-center cursor-pointer'
      style={{ width, height }}
      onClick={() => setIsFlipped((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsFlipped((prev) => !prev);
        }
      }}
    >
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className='flip-card-inner'>
          {/* 앞면 */}
          <div className='flip-card-front'>
            <Image
              src={frontSrc}
              alt='앞면'
              width={width}
              height={height}
              className='object-cover '
            />
          </div>
          {/* 뒷면 */}
          <div className='flip-card-back'>
            <Image
              src={backSrc}
              alt='뒷면'
              width={width}
              height={height}
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

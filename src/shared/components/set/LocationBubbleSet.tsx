'use client';
import Overlay from '@/shared/overlay/Overlay';
import LocationBubble from '@/shared/components/container/LocationBubble';
import { cn } from '@/shared/lib';
import type { CoursePlace } from '@/shared/api/course/types/courseSession';

interface LocationBubbleSetProps {
  isVisible: boolean;
  onClose: () => void;
  place: CoursePlace; 
  className?: string;
}

const LocationBubbleSet = ({
  isVisible,
  onClose,
  place,
  className,
}: LocationBubbleSetProps) => {
  if (!isVisible) return null;

  return (
    <>
      <Overlay onClick={onClose} />

      <div
        className={cn(
          'fixed inset-0 z-[50] flex justify-center items-center pointer-events-none',
          className,
        )}
      >
        <div className="pointer-events-auto">
          <LocationBubble place={place} />
        </div>
      </div>
    </>
  );
};

export default LocationBubbleSet;

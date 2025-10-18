'use client';
import Overlay from '@/shared/common/Overlay';
import LocationBubble from '@/shared/components/container/LocationBubble';
import { cn } from '@/shared/lib';

interface LocationBubbleSetProps {
  isVisible: boolean;
  onClose?: () => void;
  name: string;
  imageSrc?: string;
  className?: string;
}

const LocationBubbleSet = ({
  isVisible,
  onClose,
  name,
  imageSrc,
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
          <LocationBubble name={name} imageSrc={imageSrc} />
        </div>
      </div>
    </>
  );
};


export default LocationBubbleSet;

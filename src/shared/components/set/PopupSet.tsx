import { useState } from 'react';
import { cn } from '@/shared/lib';
import Popup from '@/shared/components/container/Popup';
import Overlay from '@/shared/overlay/Overlay';

interface PopupSetProps {
  text: string;
  onClose?: () => void;
}

export default function PopupSet({ text, onClose }: PopupSetProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay />
      {/* 중앙 고정 */}
      <div
        className={cn(
          'fixed inset-0 z-[100]',
          'flex items-center justify-center',
        )}
      >
        <Popup text={text} onClose={handleClose} />
      </div>
    </>
  );
}

import { useState } from 'react';
import { cn } from '@/shared/lib';

interface PopupProps {
  text: string;
  onClose?: () => void;
}

export default function Popup({ text, onClose }: PopupProps) {
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        'absolute px-[1.6rem] py-[1.5rem] w-[26.2rem] h-[12rem]',
        'bg-white border border-gray-200 rounded-[0.8rem]',
        'flex flex-col items-center justify-center gap-[1.4rem]',
      )}
    >
      <p className='text-title-sm text-gray-500'>{text}</p>
      <button className='text-title-md text-blue-400' onClick={handleClose}>
        확인
      </button>
    </div>
  );
}

'use client';
import { Icon } from '@/shared/icons';
import { handleSave, handleShare } from '@/shared/utils/postcardActions';

interface PostCardActionsProps {
  className?: string; // 커스터마이징 가능하도록
}

export const PostCardActions = ({ className }: PostCardActionsProps) => {
  return (
    <div className={`w-full  flex justify-center ${className ?? ''}`}>
      <button
        className='flex items-center justify-center w-[4.8rem] h-[4.8rem]'
        onClick={handleSave}
        aria-label='엽서 이미지 저장'
      >
        <Icon name='Save' color='gray-400' size={28} aria-hidden='true' />
      </button>

      <button
        className='flex items-center justify-center w-[4.8rem] h-[4.8rem]'
        onClick={handleShare}
        aria-label='엽서 공유하기'
      >
        <Icon name='Export' color='gray-400' size={28} aria-hidden='true' />
      </button>
    </div>
  );
};

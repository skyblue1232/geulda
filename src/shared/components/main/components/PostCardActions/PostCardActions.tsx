'use client';
import { Icon } from '@/shared/icons';
import { handleSave } from '@/shared/utils/postcardActions';

interface PostCardActionsProps {
  imageUrl: string;
  placeName: string;
}

export const PostCardActions = ({
  imageUrl,
  placeName,
}: PostCardActionsProps) => {
  return (
    <div className='w-full flex justify-end gap-[1.2rem]'>
      <button
        className='flex items-center justify-center w-[4.8rem] h-[4.8rem]'
        onClick={() => handleSave(imageUrl, placeName)}
        aria-label={`${placeName} 엽서 저장`}
      >
        <Icon name='Save' color='gray-400' size={28} aria-hidden='true' />
      </button>
    </div>
  );
};

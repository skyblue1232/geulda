'use client';

export default function ChattingLoading() {
  return (
    <div className='flex items-end gap-[0.35rem] py-[0.4rem]'>
      <span className='w-[0.8rem] h-[0.8rem] rounded-full bg-pink-50 animate-dot1' />
      <span className='w-[0.8rem] h-[0.8rem] rounded-full bg-pink-100 animate-dot2' />
      <span className='w-[0.8rem] h-[0.8rem] rounded-full bg-pink-200 animate-dot3' />
    </div>
  );
}

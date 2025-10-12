import React from 'react';

export default function TypographyDemo() {
  return (
    <div className='p-8 space-y-12 bg-background text-foreground min-h-screen'>
      {/* Pretendard Display */}
      <section>
        <h2 className='bg-main-1 text-2xl font-bold mb-4'>
          Pretendard Display
        </h2>
        {/* 이렇게 사용 Tailwind가 자동으로 반응형 처리 */}
        <p className="text-display-lg md:text-display-md lg:text-display-sm">Display Large - Pretendard</p>
        <p className='text-main-10 text-display-md'>
          Display Medium - Pretendard
        </p>
        <p className='text-display-sm'>Display Small - Pretendard</p>
      </section>

      {/* Pretendard Headline */}
      <section>
        <h2 className=' text-2xl font-bold mb-4'>Pretendard Headline</h2>
        <p className='text-secondary-8 text-headline-lg'>
          Headline Large - Pretendard
        </p>
        <p className='text-headline-md'>Headline Medium - Pretendard</p>
        <p className='text-headline-sm'>Headline Small - Pretendard</p>
      </section>

      {/* Pretendard Title / Label / Body */}
      <section>
        <h2 className='text-gray-8 text-2xl font-bold mb-4'>
          Pretendard Title / Label / Body
        </h2>
        <p className='text-title-lg'>Title Large</p>
        <p className='text-title-md'>Title Medium</p>
        <p className='text-title-sm'>Title Small</p>

        <p className='text-label-lg'>Label Large</p>
        <p className='text-label-md'>Label Medium</p>
        <p className='text-label-sm'>Label Small</p>

        <p className='text-body-lg'>Body Large</p>
        <p className='text-body-md'>Body Medium</p>
        <p className='text-body-sm'>Body Small</p>
      </section>

      {/* JEN Serif Display / Headline / Label */}
      <section>
        <h2 className='text-2xl font-bold mb-4'>JEN Serif</h2>
        <p className='text-display-serif'>Display - JEN Serif</p>
        <p className='text-headline-lg-serif'>Headline Large - JEN Serif</p>
        <p className='text-headline-md-serif'>Headline Medium - JEN Serif</p>
        <p className='text-headline-sm-serif'>Headline Small - JEN Serif</p>
        <p className='text-label-serif'>Label - JEN Serif</p>
      </section>
    </div>
  );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      /* colors */
      colors: {
        main: {
          1: 'var(--color-main-1)',
          2: 'var(--color-main-2)',
          3: 'var(--color-main-3)',
          4: 'var(--color-main-4)',
          5: 'var(--color-main-5)',
          6: 'var(--color-main-6)',
          7: 'var(--color-main-7)',
          8: 'var(--color-main-8)',
          9: 'var(--color-main-9)',
          10: 'var(--color-main-10)',
        },
        secondary: {
          1: 'var(--color-secondary-1)',
          2: 'var(--color-secondary-2)',
          3: 'var(--color-secondary-3)',
          4: 'var(--color-secondary-4)',
          5: 'var(--color-secondary-5)',
          6: 'var(--color-secondary-6)',
          7: 'var(--color-secondary-7)',
          8: 'var(--color-secondary-8)',
          9: 'var(--color-secondary-9)',
          10: 'var(--color-secondary-10)',
        },
        gray: {
          1: 'var(--color-gray-1)',
          2: 'var(--color-gray-2)',
          3: 'var(--color-gray-3)',
          4: 'var(--color-gray-4)',
          5: 'var(--color-gray-5)',
          6: 'var(--color-gray-6)',
          7: 'var(--color-gray-7)',
          8: 'var(--color-gray-8)',
          9: 'var(--color-gray-9)',
          10: 'var(--color-gray-10)',
        },
        blue: 'var(--color-blue)',
        red: {
          1: 'var(--color-red-1)',
          2: 'var(--color-red-2)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      /* display */
      display: {
        'layout-flex': 'flex',
        'layout-grid': 'grid',
        'layout-block': 'block',
        'layout-inline': 'inline-block',
      },
      /* grid & layout */
      gridTemplateColumns: {
        'layout-6': 'repeat(6, minmax(0, 1fr))', // 모바일 6컬럼 그리드
        'layout-4': 'repeat(4, minmax(0, 1fr))', // 모바일 4컬럼 그리드
      },
      gridTemplateRows: {
        'layout-auto': 'auto',
      },
      maxWidth: {
        mobile: '430px', // 모바일 최대 넓이
      },
      minWidth: {
        100: '100px',
        200: '200px',
      },
      /* gap(패딩)*/
      gap: {
        1: '0.25rem', // 4px
        2: '0.5rem', // 8px
        3: '0.625`rem', // 10px
        3.5: '0.875rem', // 14px
        4: '1rem', // 16px
        4.5: '1.125rem', // 18px
        5: '1.25rem', // 20px
        6: '1.5rem', // 24px
        18: '4.5rem', // 72px
        // 필요 시 LAYER GUID 기준 값 추가
      },
      /* Radius(모서리)*/
      borderRadius: {
        xs: '2px',
        base: '5px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      /* font*/
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        serif: ['JEN Serif', 'serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        /* Pretendard */
        /* DISPLAY */
        '.text-display-lg': {
          fontSize: '3.5625rem', //57px
          fontWeight: 300,
          lineHeight: '4rem', //64px
          letterSpacing: '-0.015625rem', //-0.25px',
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-display-md': {
          fontSize: '3.25rem', //52px
          fontWeight: 300,
          lineHeight: '2.8125rem', //45px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-display-sm': {
          fontSize: '2.25rem', //36px
          fontWeight: 300,
          lineHeight: '2.75rem', //44px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        /* HEADLINE */
        '.text-headline-lg': {
          fontSize: '2rem', //32px
          fontWeight: 200,
          lineHeight: '2.5rem', //40px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-headline-md': {
          fontSize: '1.75rem', //28px
          fontWeight: 200,
          lineHeight: '2rem', //32px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-headline-sm': {
          fontSize: '1.5rem', //24px
          fontWeight: 200,
          lineHeight: '2rem', //32px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },

        /* TITLE */
        '.text-title-lg': {
          fontSize: '1.375rem', //22px
          fontWeight: 400,
          lineHeight: '1.75rem', //28px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-title-md': {
          fontSize: '1rem', //16px
          fontWeight: 400,
          lineHeight: '1.5rem', //24px
          letterSpacing: '0.009375rem', //0.15px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-title-sm': {
          fontSize: '0.875rem', //14px
          fontWeight: 400,
          lineHeight: '1.25rem', //20px
          letterSpacing: '0.00625rem', //0.1px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        /* LABEL */
        '.text-label-lg': {
          fontSize: '0.875rem', //14px
          fontWeight: 300,
          lineHeight: '1.25rem', //20px
          letterSpacing: '0.00625rem', //0.1px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-label-md': {
          fontSize: '0.75rem', //12px
          fontWeight: 300,
          lineHeight: '1rem', //16px
          letterSpacing: '0.03125rem', //0.5px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-label-sm': {
          fontSize: '0.6875rem', //11px
          fontWeight: 300,
          lineHeight: '1rem', //16px
          letterSpacing: '0.03125rem', //0.5px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        /* BODY */
        '.text-body-lg': {
          fontSize: '0.875rem', //14px,
          fontWeight: 400,
          lineHeight: '1.5rem', //24px
          letterSpacing: '0.03125rem', //0.5px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-body-md': {
          fontSize: '0.75rem', //12px
          fontWeight: 300,
          lineHeight: '1.25rem', //20px
          letterSpacing: '0.015625rem', //0.25px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-body-sm': {
          fontSize: '0.625rem', //10px
          fontWeight: 200,
          lineHeight: '1rem', //16px
          letterSpacing: '0.025rem', // 0.4px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },

        /* JEN Serif */
        /* DISPLAY */
        '.text-display-serif': {
          fontSize: '2.25rem', //36px
          fontWeight: 200,
          lineHeight: '2.875rem', //46px
          letterSpacing: '0.375rem', //6px
          fontFamily: 'JEN Serif, serif',
        },
        /* HEADLINE */
        '.text-headline-lg-serif': {
          fontSize: '2rem', //32px
          fontWeight: 200,
          lineHeight: '2.5rem', //40px
          letterSpacing: '0.125rem', //2px
          fontFamily: 'JEN Serif, serif',
        },
        '.text-headline-md-serif': {
          fontSize: '1.5rem', //24px
          fontWeight: 200,
          lineHeight: '2rem', //32px
          letterSpacing: '0.125rem', //2px
          fontFamily: 'JEN Serif, serif',
        },
        '.text-headline-sm-serif': {
          fontSize: '1.25rem', //20px
          fontWeight: 200,
          lineHeight: '1.5rem', //24px
          letterSpacing: '0.75rem', //12px
          fontFamily: 'JEN Serif, serif',
        },
        /* LABEL */
        '.text-label-serif': {
          fontSize: '0.875rem', //14px
          fontWeight: 200,
          lineHeight: '1.25rem', //20px
          letterSpacing: '0.25rem', //4px
          fontFamily: 'JEN Serif, serif',
        },
      };
      addUtilities(newUtilities, { variants: ['responsive'] });
    },
  ],
};

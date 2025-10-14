/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      /* colors */
      colors: {
        mint: {
          50: 'var(--mint-50)',
          100: 'var(--mint-100)',
          200: 'var(--mint-200)',
          300: 'var(--mint-300)',
          400: 'var(--mint-400)',
          500: 'var(--mint-500)',
          600: 'var(--mint-600)',
          700: 'var(--mint-700)',
          800: 'var(--mint-800)',
          900: 'var(--mint-900)',
        },
        pink: {
          50: 'var(--pink-50)',
          100: 'var(--pink-100)',
          200: 'var(--pink-200)',
          300: 'var(--pink-300)',
          400: 'var(--pink-400)',
          500: 'var(--pink-500)',
          600: 'var(--pink-600)',
          700: 'var(--pink-700)',
          800: 'var(--pink-800)',
          900: 'var(--pink-900)',
        },
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        blue: {
          400: 'var(--blue-400)',
        },
        red: {
          300: 'var(--red-300)',
          400: 'var(--red-400)',
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
      /* padding, margin, gap 모두 사용 가능*/
      spacing: {
        0: '0rem',
        1: '0.4rem',
        2: '0.8rem',
        3: '1rem',
        4: '1.6rem',
        5: '2rem',
        6: '2.4rem',
        7: '2.8rem',
        8: '3.2rem',
        9: '3.6rem',
        10: '4rem',
        18: '7.2rem',
      },
      /* Radius*/
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
          fontSize: '5.7rem', //57px
          fontWeight: 300,
          lineHeight: '6.4rem', //64px
          letterSpacing: '-0.025rem', //-0.25px',
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-display-md': {
          fontSize: '5.2rem', //52px
          fontWeight: 300,
          lineHeight: '4.5rem', //45px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-display-sm': {
          fontSize: '3.6rem', //36px
          fontWeight: 300,
          lineHeight: '4.4rem', //44px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        /* HEADLINE */
        '.text-headline-lg': {
          fontSize: '3.2rem', //32px
          fontWeight: 200,
          lineHeight: '4rem', //40px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-headline-md': {
          fontSize: '2.8rem', //28px
          fontWeight: 200,
          lineHeight: '3.2rem', //32px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-headline-sm': {
          fontSize: '2.4rem', //24px
          fontWeight: 200,
          lineHeight: '3.2rem', //32px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },

        /* TITLE */
        '.text-title-lg': {
          fontSize: '2.2rem', //22px
          fontWeight: 400,
          lineHeight: '1.75rem', //28px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-title-md': {
          fontSize: '1.6rem', //16px
          fontWeight: 400,
          lineHeight: '2.4rem', //24px
          letterSpacing: '0.015rem', //0.15px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-title-sm': {
          fontSize: '1.4rem', //14px
          fontWeight: 400,
          lineHeight: '2rem', //20px
          letterSpacing: '0.01rem', //0.1px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        /* LABEL */
        '.text-label-lg': {
          fontSize: '1.4rem', //14px
          fontWeight: 300,
          lineHeight: '2rem', //20px
          letterSpacing: '0.01rem', //0.1px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-label-md': {
          fontSize: '1.2em', //12px
          fontWeight: 300,
          lineHeight: '1.6rem', //16px
          letterSpacing: '0.05rem', //0.5px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-label-sm': {
          fontSize: '1.1rem', //11px
          fontWeight: 300,
          lineHeight: '1.6rem', //16px
          letterSpacing: '0.05rem', //0.5px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        /* BODY */
        '.text-body-lg': {
          fontSize: '1.4rem', //14px,
          fontWeight: 400,
          lineHeight: '2.4rem', //24px
          letterSpacing: '0.05rem', //0.5px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-body-md': {
          fontSize: '1.2rem', //12px
          fontWeight: 300,
          lineHeight: '2rem', //20px
          letterSpacing: '0.025rem', //0.25px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },
        '.text-body-sm': {
          fontSize: '1rem', //10px
          fontWeight: 200,
          lineHeight: '1.6rem', //16px
          letterSpacing: '0.04rem', // 0.4px
          fontFamily: 'Pretendard, system-ui, sans-serif',
        },

        /* JEN Serif */
        /* DISPLAY */
        '.text-display-serif': {
          fontSize: '3.6rem', //36px
          fontWeight: 200,
          lineHeight: '4.6rem', //46px
          letterSpacing: '0.6rem', //6px
          fontFamily: 'JEN Serif, serif',
        },
        /* HEADLINE */
        '.text-headline-lg-serif': {
          fontSize: '3.2rem', //32px
          fontWeight: 200,
          lineHeight: '4rem', //40px
          letterSpacing: '0.2rem', //2px
          fontFamily: 'JEN Serif, serif',
        },
        '.text-headline-md-serif': {
          fontSize: '2.4rem', //24px
          fontWeight: 200,
          lineHeight: '3.2rem', //32px
          letterSpacing: '0.2rem', //2px
          fontFamily: 'JEN Serif, serif',
        },
        '.text-headline-sm-serif': {
          fontSize: '2rem', //20px
          fontWeight: 200,
          lineHeight: '2.4rem', //24px
          letterSpacing: '1.2rem', //12px
          fontFamily: 'JEN Serif, serif',
        },
        /* LABEL */
        '.text-label-serif': {
          fontSize: '1.4rem', //14px
          fontWeight: 200,
          lineHeight: '2rem', //20px
          letterSpacing: '0.4rem', //4px
          fontFamily: 'JEN Serif, serif',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

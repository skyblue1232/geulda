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
        sans: ['"Pretendard"', 'system-ui', 'sans-serif'],
        serif: ['"JEN Serif"', 'serif'],
      },
    },
  },
  plugins: [],
};

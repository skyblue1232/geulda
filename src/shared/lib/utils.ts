import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'display-lg',
        'display-md',
        'display-sm',
        'headline-lg',
        'headline-md',
        'headline-sm',
        'title-lg',
        'title-md',
        'title-sm',
        'label-lg',
        'label-md',
        'label-sm',
        'body-lg',
        'body-md',
        'body-sm',
        'display-serif',
        'headline-lg-serif',
        'headline-md-serif',
        'headline-sm-serif',
        'label-serif',
      ],

      color: [
        'mint-50',
        'mint-100',
        'mint-200',
        'mint-300',
        'mint-400',
        'mint-500',
        'mint-600',
        'mint-700',
        'mint-800',
        'mint-900',
        'pink-50',
        'pink-100',
        'pink-200',
        'pink-300',
        'pink-400',
        'pink-500',
        'pink-600',
        'pink-700',
        'pink-800',
        'pink-900',
        'gray-50',
        'gray-100',
        'gray-200',
        'gray-300',
        'gray-400',
        'gray-500',
        'gray-600',
        'gray-700',
        'gray-800',
        'gray-900',
        'blue-400',
        'red-300',
        'red-400',
        'background',
        'foreground',
      ],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

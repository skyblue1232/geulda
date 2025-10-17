import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { cva, type VariantProps } from 'class-variance-authority';

interface HeaderProps {}

const TagStyle = cva('px-[1.2rem] py-[0.5rem] ', {
  variants: {
    color: {
      toggleTag: 'bg-pink-300 text-label-md',
      hashTag: 'bg-mint-600 text-title-sm',
    },
  },
  defaultVariants: {
    color: 'hashTag',
  },
});
const Tag = ({}: HeaderProps) => {
  return <></>;
};

export default Tag;

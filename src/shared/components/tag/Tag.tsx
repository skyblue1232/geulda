import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { cva, type VariantProps } from 'class-variance-authority';

interface HeaderProps {}

const TagStyle = cva(
  'w-full h-[11.8rem] px-[1.6rem] pb-[1.8rem] pt-[7.6rem] fixed top-0 left-0 right-0 z-[100]',
  {
    variants: {
      color: {
        mint300: 'bg-mint-300',
        mint50: 'bg-mint-50',
      },
    },
    defaultVariants: {
      color: 'mint300',
    },
  },
);
const Tag = ({}: HeaderProps) => {
  return <></>;
};

export default Tag;

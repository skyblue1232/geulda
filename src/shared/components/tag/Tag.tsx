import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/icons';
import type { IconName } from '@/shared/icons/iconNames';

interface Props {
  label: string;
  icon?: IconName;
  className?: string;
  onClick?: () => void;
  variant?: VariantProps<typeof tagStyle>['variant'];
}

const tagStyle = cva('flex items-center rounded-[500px] text-gray-50 ', {
  variants: {
    variant: {
      hash: 'bg-mint-600 text-title-sm px-[1.2rem] py-[0.3rem]',
      toggle:
        'bg-pink-300 w-[10rem] text-label-md gap-2 justify-center py-[0.5rem] font-medium',
    },
  },
  defaultVariants: {
    variant: 'hash',
  },
});

const Tag = ({ label, icon, variant, className, onClick }: Props) => {
  return (
    <button
      type='button'
      className={cn(tagStyle({ variant }), className)}
      onClick={onClick}
    >
      {icon && <Icon name={icon} size={14} color='gray-50' />}
      <span>{label}</span>
    </button>
  );
};

export default Tag;

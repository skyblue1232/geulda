import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { cva, type VariantProps } from 'class-variance-authority';
import type { IconName } from '@/shared/icons/iconNames';

const tabItemStyle = cva(
  'flex flex-col items-center justify-center gap-[0.2rem] cursor-pointer select-none transition-all duration-200',
  {
    variants: {
      active: {
        true: 'text-mint-700',
        false: 'text-mint-500',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

interface TabItemProps extends VariantProps<typeof tabItemStyle> {
  label: string;
  icon: IconName;
  isActive?: boolean;
  onClick?: () => void;
}

export const TabItem = ({
  label,
  icon,
  isActive = false,
  onClick,
}: TabItemProps) => {
  return (
    <div
      className={cn(tabItemStyle({ active: isActive }))} 
      onClick={onClick}
    >
      <Icon
        name={icon}
        size={24}
        color={isActive ? 'mint-700' : 'mint-500'}
        className={cn(
          'transition-transform duration-200',
          isActive && 'scale-110',
        )}
      />
      <span
        className={cn(
          'text-body-sm',
          isActive ? 'text-mint-700' : 'text-mint-500',
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default TabItem;

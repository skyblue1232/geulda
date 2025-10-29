import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyle> {
  label: string;
}

const buttonStyle = cva(
  `
  text-center rounded-[2rem] text-title-md
  py-[1rem] w-[11.3rem] border border-[1px]
  transition-colors duration-150 flex justify-center items-center
  select-none focus:outline-none focus:ring-0 active:outline-none
  `,
  {
    variants: {
      variant: {
        default: 'bg-gray-100 border-gray-200 text-gray-400',
        active: 'bg-mint-100 border-mint-200 text-mint-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const CommonButton = ({
  label,
  variant,
  className,
  ...props
}: CommonButtonProps) => {
  return (
    <button
      type="button"
      className={cn(buttonStyle({ variant }), className)}
      {...props}
    >
      {label}
    </button>
  );
};

export default CommonButton;

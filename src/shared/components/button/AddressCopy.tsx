'use client';
import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { cva, type VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { Copy } from '@/shared/utils/copy';

const addressCopyStyle = cva(
  'flex items-center justify-start flex-shrink-0 rounded-full transition-all duration-200',
  {
    variants: {
      variant: {
        gray: 'border border-gray-300 bg-gray-50 text-gray-400',
        mint: 'border border-mint-300 bg-mint-50 text-mint-500',
      },
    },
    defaultVariants: {
      variant: 'gray',
    },
  },
);

interface AddressCopyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof addressCopyStyle> {
  label: string;
  value: string;
}

const AddressCopy = ({
  label = 'address copy',
  value = label,
  variant = 'gray',
  className,
  ...props
}: AddressCopyProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    Copy(
      value,
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      },
      undefined,
    );
  };

  return (
    <div
      onClick={handleCopy}
      className={cn(
        addressCopyStyle({ variant }),
        'w-[35.4rem] h-[4rem] px-[1.3rem] py-[1rem] gap-[0.4rem]',
        'cursor-pointer select-none',
        className,
      )}
      {...props}
    >
      <Icon
        name='CopySimple'
        size={18}
        color={variant === 'mint' ? 'mint-400' : 'gray-400'}
      />
      <span
        className={cn(
          'text-label-lg',
          variant === 'mint' ? 'text-mint-400' : 'text-gray-400',
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default AddressCopy;

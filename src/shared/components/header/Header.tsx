import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { cva, type VariantProps } from 'class-variance-authority';

interface HeaderProps {
  title: string;
  onClick: () => void;
  className?: string;
  color?: VariantProps<typeof headerStyle>['color'];
}

const headerStyle = cva(
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

const Header = ({ title, onClick, color, className }: HeaderProps) => {
  return (
    <header className={cn(headerStyle({ color }), className)}>
      <div className='mx-auto h-[2.4rem] grid grid-cols-[auto_1fr_auto] items-center text-mint-900'>
        <button
          type='button'
          aria-label='뒤로가기'
          onClick={onClick}
          className='grid place-items-center w-[2.4rem] h-[2.4rem]'
        >
          <Icon name='Caret' size={24} color='mint-900' />
        </button>

        <h1
          className={cn(
            'justify-self-center',
            'text-title-md font-[600] leading-[2.4rem] tracking-[0.015rem]',
          )}
        >
          {title}
        </h1>

        <div aria-hidden className='w-[2.4rem] h-[2.4rem]' />
      </div>
    </header>
  );
};

export default Header;

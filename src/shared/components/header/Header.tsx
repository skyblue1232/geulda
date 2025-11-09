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
  'w-full h-[10rem] px-[1.6rem] pb-[1.4rem] fixed top-0 left-0 right-0 z-[100]  flex items-end justify-between ',
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
      <div className='relative w-full flex items-center justify-center text-mint-900'>
        <button
          type='button'
          aria-label='뒤로가기'
          onClick={onClick}
          className='absolute left-[0rem] flex items-center justify-center w-[2.4rem] h-[2.4rem]'
        >
          <Icon name='Caret' size={24} color='mint-900' />
        </button>

        <h1 className='text-title-md '>{title}</h1>
      </div>
    </header>
  );
};

export default Header;

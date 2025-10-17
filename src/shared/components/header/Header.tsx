import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';

type HeaderProps = {
  title: string;
  onClick: () => void;
  className?: string;
};

const Header = ({ title, onClick, className }: HeaderProps) => {
  return (
    <header
      className={cn(
        'w-full h-[11.8rem] bg-mint-300 px-[1.6rem] pb-[1.8rem] pt-[7.6rem]',
        'fixed top-0 left-0 right-0',
        'z-100',
        className,
      )}
    >
      <div className='mx-auto h-[2.4rem] grid grid-cols-[auto_1fr_auto] items-center text-mint-900 '>
        <button
          type='button'
          aria-label='뒤로가기'
          onClick={onClick}
          className='grid place-items-center w-[2.4rem] h-[2.4rem] '
        >
          <Icon name='Caret' size={24} color='mint-900' />
        </button>

        <h1
          className={cn(
            'justify-self-center ',
            'text-title-md font-[600] leading-[2.4rem] tracking-[0.015rem] ',
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

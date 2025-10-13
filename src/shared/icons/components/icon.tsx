import clsx from 'clsx';
import type { IconName } from '../iconNames';

type IconRotate = 90 | 180 | 270;

type IconColor = // main

    | 'main-1'
    | 'main-2'
    | 'main-3'
    | 'main-4'
    | 'main-5'
    | 'main-6'
    | 'main-7'
    | 'main-8'
    | 'main-9'
    | 'main-10'
    | 'secondary-1'
    | 'secondary-2'
    | 'secondary-3'
    | 'secondary-4'
    | 'secondary-5'
    | 'secondary-6'
    | 'secondary-7'
    | 'secondary-8'
    | 'secondary-9'
    | 'secondary-10'
    | 'gray-1'
    | 'gray-2'
    | 'gray-3'
    | 'gray-4'
    | 'gray-5'
    | 'gray-6'
    | 'gray-7'
    | 'gray-8'
    | 'gray-9'
    | 'gray-10'
    | 'blue'
    | 'red-1'
    | 'red-2'
    | 'background'
    | 'foreground';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: IconColor;
  className?: string;
  rotate?: IconRotate;
  hasRotateAnimation?: boolean;
  ariaHidden?: boolean;
}

export const Icon = ({
  name,
  size,
  width,
  height,
  color,
  className,
  rotate,
  hasRotateAnimation = false,
  ariaHidden = true,
  ...rest
}: IconProps) => {
  const w = width ?? size ?? 20;
  const h = height ?? size ?? 20;

  const rotateClass =
    rotate === 90
      ? 'rotate-90'
      : rotate === 180
      ? 'rotate-180'
      : rotate === 270
      ? 'rotate-[270deg]'
      : '';

  const combined = clsx(
    'inline-block',
    rotateClass,
    hasRotateAnimation && 'transform transition-transform duration-200',
    className,
  );

  return (
    <svg
      width={typeof w === 'number' ? `${w}px` : w}
      height={typeof h === 'number' ? `${h}px` : h}
      className={combined}
      style={color ? { color: `var(--color-${color})` } : undefined}
      aria-hidden={ariaHidden}
      {...rest}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};

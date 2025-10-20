import { getDefaultClassNames } from 'react-day-picker';
import { cn } from '@/shared/lib';
import { buttonVariants, Button } from './button';

export interface CalendarClassesOptions {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
  overrides?: Partial<ReturnType<typeof getDefaultClassNames>>;
  rootClassName?: string;
}

export function createCalendarClassNames({
  buttonVariant = 'ghost',
  overrides,
  rootClassName,
}: CalendarClassesOptions = {}) {
  const d = getDefaultClassNames();

  const classes = {
    root: cn('w-fit', d.root, rootClassName),
    months: cn('flex gap-4 flex-col md:flex-row relative', d.months),
    month: cn('flex flex-col w-full gap-3', d.month),
    nav: cn(
      'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
      d.nav,
    ),
    button_previous: cn(
      buttonVariants({ variant: buttonVariant }),
      'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
      d.button_previous,
    ),
    button_next: cn(
      buttonVariants({ variant: buttonVariant }),
      'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
      d.button_next,
    ),
    month_caption: cn(
      'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
      d.month_caption,
    ),
    dropdowns: cn(
      'w-full flex items-center justify-center h-(--cell-size) gap-1.5',
      d.dropdowns,
    ),
    dropdown_root: cn('relative flex items-center gap-2', d.dropdown_root),
    dropdown: cn(d.dropdown),
    table: 'w-full border-collapse',
    weekdays: cn('flex', d.weekdays),
    weekday: cn(
      'rounded-md flex-1 text-pink-900 text-label-lg select-none',
      d.weekday,
    ),
    week: cn('flex w-full mt-2', d.week),
    week_number_header: cn('select-none w-(--cell-size)', d.week_number_header),
    week_number: cn(
      'text-[0.8rem] select-none text-muted-foreground',
      d.week_number,
    ),
    day: cn(
      'relative w-full h-full p-0 text-center group/day aspect-square select-none',
      d.day,
    ),
    range_start: cn('rounded-l-md bg-accent', d.range_start),
    range_middle: cn('rounded-none', d.range_middle),
    range_end: cn('rounded-r-md bg-accent', d.range_end),
    today: cn(
      'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
      d.today,
    ),
    outside: cn(
      'text-muted-foreground aria-selected:text-muted-foreground',
      d.outside,
    ),
    disabled: cn('text-muted-foreground opacity-50', d.disabled),
    hidden: cn('invisible', d.hidden),
  };

  return { ...classes, ...overrides } as typeof classes;
}

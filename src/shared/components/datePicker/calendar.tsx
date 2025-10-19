// src/shared/components/datePicker/calendar.tsx
import * as React from 'react';
import { DayPicker, DayButton, getDefaultClassNames } from 'react-day-picker';
import { cn } from '@/shared/lib';
import { Button, buttonVariants } from '@/shared/components/datePicker/button';
import { Icon } from '@/shared/icons';
import { CustomDropdown } from '@/shared/components/datePicker/CustomDropdown';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'dropdown',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaults = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn(
        'bg-gray-50 border rounded-[5px] border-pink-100 group/calendar p-3 [--cell-size:--spacing(8)]',
        className,
      )}
      formatters={{
        // 월 라벨 포맷(예: 10월 → Oct 등 원하는대로 변경)
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'long' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaults.root),
        months: cn('flex gap-4 flex-col md:flex-row relative', defaults.months),
        month: cn('flex flex-col w-full gap-3', defaults.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaults.nav,
        ),

        // 네비 버튼
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaults.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaults.button_next,
        ),

        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          defaults.month_caption,
        ),

        // 드롭다운 래퍼들(우리 컴포넌트가 자체 스타일을 가지므로 가볍게만)
        dropdowns: cn(
          'w-full flex items-center justify-center h-(--cell-size) gap-1.5',
          defaults.dropdowns,
        ),
        dropdown_root: cn(
          'relative flex items-center gap-2',
          defaults.dropdown_root,
        ),
        dropdown: cn('', defaults.dropdown),

        table: 'w-full border-collapse',
        weekdays: cn('flex', defaults.weekdays),
        weekday: cn(
          'rounded-md flex-1 text-pink-900 text-label-lg select-none',
          defaults.weekday,
        ),
        week: cn('flex w-full mt-2', defaults.week),
        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaults.week_number_header,
        ),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaults.week_number,
        ),

        day: cn(
          'relative w-full h-full p-0 text-center group/day aspect-square select-none',
          defaults.day,
        ),
        range_start: cn('rounded-l-md bg-accent', defaults.range_start),
        range_middle: cn('rounded-none', defaults.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaults.range_end),
        today: cn(
          'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
          defaults.today,
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaults.outside,
        ),
        disabled: cn('text-muted-foreground opacity-50', defaults.disabled),
        hidden: cn('invisible', defaults.hidden),

        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, options, 'aria-label': a11y }) => {
          const opts = (
            options as {
              value: number;
              label: string;
              disabled?: boolean;
            }[]
          ).map((o) => ({ ...o, disabled: Boolean(o.disabled) }));

          return (
            <CustomDropdown
              value={value as number}
              options={opts}
              onChange={(next: number) => {
                // DayPicker는 <select> change 이벤트를 기대하므로, synthetic event를 생성해 전달
                const evt = {
                  target: { value: String(next) },
                } as unknown as React.ChangeEvent<HTMLSelectElement>;

                onChange?.(evt);
              }}
              aria-label={a11y}
            />
          );
        },
        // 좌/우/상 아이콘
        Chevron: ({ orientation }) => {
          if (orientation === 'left') {
            return <Icon name='Caret' color='pink-800' size={16} />;
          } else if (orientation === 'right') {
            return (
              <Icon name='Caret' rotate={180} color='pink-800' size={16} />
            );
          }
          return <Icon name='Caret' rotate={270} color='pink-800' size={12} />;
        },

        DayButton: CalendarDayButton,

        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className='flex size-(--cell-size) items-center justify-center text-center'>
              {children}
            </div>
          </td>
        ),

        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaults = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant='ghost'
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'flex size-auto w-full min-w-(--cell-size) flex-col gap-1',
        defaults.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };

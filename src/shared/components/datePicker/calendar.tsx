import * as React from 'react';
import { DayPicker, DayButton } from 'react-day-picker';
import { cn } from '@/shared/lib';
import { Button } from './button';
import { Icon } from '@/shared/icons';
import { createCalendarClassNames } from './calendar.classes';
import { CalendarDropdownAdapter } from './CalendarDropdownAdapter';

function Calendar({
  className,
  showOutsideDays = true,
  captionLayout = 'dropdown',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const classNames = createCalendarClassNames({
    buttonVariant,
    rootClassName: undefined,
  });

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn(
        'bg-white border rounded-[5px] border-pink-100 p-3 [--cell-size:--spacing(8)]',
        className,
      )}
      formatters={{
        formatMonthDropdown: (d) =>
          d.toLocaleString('default', { month: 'long' }),
        ...formatters,
      }}
      classNames={classNames}
      components={{
        Dropdown: CalendarDropdownAdapter,
        Chevron: ({ orientation }) =>
          orientation === 'left' ? (
            <Icon name='Caret' color='pink-800' size={16} />
          ) : orientation === 'right' ? (
            <Icon name='Caret' rotate={180} color='pink-800' size={16} />
          ) : (
            <Icon name='Caret' rotate={270} color='pink-800' size={12} />
          ),
        DayButton: CalendarDayButton,
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
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };

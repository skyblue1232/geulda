'use client';
import { Calendar } from './calendar';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { useEffect, useState } from 'react';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  defaultValue?: Date;
  className?: string;
}
const toFirstOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
export function DatePicker({
  value,
  onChange,
  defaultValue,
  className,
  ...calendarProps
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [innerDate, setInnerDate] = useState<Date | undefined>(defaultValue);

  const [displayMonth, setDisplayMonth] = useState<Date>(
    toFirstOfMonth(value ?? innerDate ?? new Date()),
  );

  useEffect(() => {
    if (value !== undefined) {
      setInnerDate(value);
      setDisplayMonth(toFirstOfMonth(value));
    }
  }, [value]);

  useEffect(() => {
    if (open) {
      const base = value ?? innerDate ?? new Date();
      setDisplayMonth(toFirstOfMonth(base));
    }
  }, [open, value, innerDate]);

  const selected = value ?? innerDate;

  const handleSelect = (d?: Date) => {
    if (!d) return;
    onChange ? onChange(d) : setInnerDate(d);
    setDisplayMonth(toFirstOfMonth(d));
    setOpen(false);
  };

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className='w-[16rem] h-[4rem] justify-between rounded-[500px] text-label-lg text-pink-300 bg-pink-50 border border-pink-100'>
            {selected ? selected.toLocaleDateString() : 'Select date'}
            <Icon name='CalendarBlank' color='pink-400' size={14} />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-[24rem] p-0' align='start'>
          <Calendar
            mode='single'
            className='w-[24rem] h-auto p-3 [--cell-size:2.8rem]'
            selected={selected}
            onSelect={handleSelect}
            month={displayMonth}
            onMonthChange={setDisplayMonth}
            captionLayout='dropdown'
            disabled={{ before: startOfToday }}
            fromDate={startOfToday}
            toYear={new Date(new Date().getFullYear() + 5, 0, 1).getFullYear()}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

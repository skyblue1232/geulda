'use client';
import * as React from 'react';
import { Calendar } from './calendar';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  defaultValue?: Date;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  defaultValue,
  className,
  ...calendarProps
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [innerDate, setInnerDate] = React.useState<Date | undefined>(
    defaultValue,
  );

  const selected = value ?? innerDate;

  const handleSelect = (d?: Date) => {
    if (!d) return;
    onChange ? onChange(d) : setInnerDate(d);
    setOpen(false);
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id='date'
            className='w-[16rem] h-[4rem] justify-between rounded-[500px] text-label-lg text-pink-300 bg-pink-50 border border-pink-100'
          >
            {selected ? selected.toLocaleDateString() : 'Select date'}
            <Icon name='CalendarBlank' color='pink-400' size={14} />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-[24rem] overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            className='w-[24rem] h-auto p-3 [--cell-size:2.8rem]'
            selected={selected}
            onSelect={handleSelect}
            captionLayout='dropdown'
            fromYear={new Date().getFullYear()}
            toYear={new Date(new Date().getFullYear() + 5, 0, 1).getFullYear()}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

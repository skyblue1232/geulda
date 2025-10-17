'use client';

import * as React from 'react';
import { Calendar } from './calendar';

import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Icon } from '@/shared/icons';

export function DatePicker() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return (
    <div className='flex flex-col gap-3'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id='date'
            tone='pink'
            className=' w-[16rem] h-[4rem] justify-between rounded-[500px] text-label-lg'
          >
            {date ? date.toLocaleDateString() : 'Select date'}
            <Icon name='CalendarBlank' color='pink-400' size={14} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-[24rem]  overflow-hidden p-0'
          align='start'
        >
          <Calendar
            mode='single'
            className='w-[24rem] h-auto p-3 [--cell-size:2.8rem]'
            selected={date}
            captionLayout='dropdown'
            fromYear={startOfToday.getFullYear()}
            toYear={startOfToday.getFullYear() + 5}
            disabled={{ before: startOfToday }}
            onSelect={(d) => {
              if (!d) return;
              setDate(d);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

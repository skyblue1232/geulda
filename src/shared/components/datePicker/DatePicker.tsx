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
            variant='outline'
            id='date'
            className='w-48 justify-between font-normal'
          >
            {date ? date.toLocaleDateString() : 'Select date'}
            <Icon name='CalendarBlank' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
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

'use client';

import * as React from 'react';
import { Calendar } from './calendar';

import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Icon } from '@/shared/icons';

export function DatePicker() {
  const [open, setOpen] = React.useState(false);
  const [date] = React.useState<Date | undefined>(undefined);

  return (
    <div className='flex flex-col gap-3'>
      <div className='px-1'>Date of birth</div>
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
        <PopoverContent
          className='w-auto overflow-hidden p-0 z-1000'
          align='start'
        >
          <Calendar
            mode='single'
            selected={date}
            captionLayout='dropdown'
            fromYear={2025}
            toYear={2035}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

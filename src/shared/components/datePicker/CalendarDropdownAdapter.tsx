import * as React from 'react';
import { CustomDropdown } from './CustomDropdown';
import type { DropdownProps } from 'react-day-picker';

export function CalendarDropdownAdapter({
  value,
  onChange,
  options,
  'aria-label': ariaLabel,
}: DropdownProps) {
  return (
    <CustomDropdown
      value={value as number}
      options={options as any}
      aria-label={ariaLabel}
      onChange={(next) => {
        const evt = {
          target: { value: String(next) },
        } as unknown as React.ChangeEvent<HTMLSelectElement>;
        onChange?.(evt);
      }}
    />
  );
}

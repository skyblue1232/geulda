import * as React from 'react';
import { cn } from '@/shared/lib';
import { DropdownOption } from 'react-day-picker';

export interface CustomDropdownProps {
  value?: number;
  onChange: (next: number) => void;
  options: DropdownOption[];
  'aria-label'?: string;
}

export function CustomDropdown({
  value,
  onChange,
  options,
  'aria-label': ariaLabel,
}: CustomDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const [activeIndex, setActiveIndex] = React.useState(selectedIndex);

  const label = options.find((o) => o.value === value)?.label ?? '';

  // 바깥 클릭 닫기
  React.useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!buttonRef.current?.contains(t) && !listRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  // 키보드 내비
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (
      !open &&
      (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ')
    ) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      let i = activeIndex + 1;
      while (i < options.length && options[i].disabled) i++;
      setActiveIndex(Math.min(i, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      let i = activeIndex - 1;
      while (i >= 0 && options[i].disabled) i--;
      setActiveIndex(Math.max(i, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt && !opt.disabled) {
        onChange?.(opt.value);
        setOpen(false);
      }
    }
  };

  return (
    <div className='relative inline-block'>
      <button
        ref={buttonRef}
        type='button'
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={cn(
          'h-[32px] rounded-[12px] bg-pink-50 border border-pink-100',
          'px-3 pr-8 text-label-lg text-pink-800 inline-flex items-center gap-1',
          'focus:outline-none focus:ring-2 focus:ring-pink-200',
        )}
      >
        {label}
      </button>

      {open && (
        <ul
          ref={listRef}
          role='listbox'
          tabIndex={-1}
          aria-label={ariaLabel}
          className={cn(
            'absolute z-50 mt-2 w-[14rem] max-h-[20rem] overflow-auto',
            'rounded-[12px] border border-pink-200 bg-white p-1',
          )}
        >
          {options.map((opt, idx) => {
            const selected = opt.value === value;
            const highlighted = idx === activeIndex;
            return (
              <li
                key={opt.value}
                role='option'
                aria-selected={selected}
                aria-disabled={opt.disabled || undefined}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (!opt.disabled) {
                    onChange?.(opt.value);
                    setOpen(false);
                  }
                }}
                className={cn(
                  'relative cursor-pointer select-none rounded-[8px] px-3 py-2 text-body-md',
                  opt.disabled && 'opacity-40 pointer-events-none',
                  highlighted && 'bg-pink-50',
                  selected && 'text-pink-800 font-medium',
                )}
              >
                {opt.label}
                {selected && (
                  <span className='absolute left-2 top-1/2 -translate-y-1/2'></span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

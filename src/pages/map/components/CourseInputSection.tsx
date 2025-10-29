'use client';

import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';

interface CourseInputSectionProps {
  placeholder?: string;
  label?: string;
  onNext?: () => void;
  disabled?: boolean;
}

export default function CourseInputSection({
  placeholder = '여기에 입력해 주세요...',
  label = '꼭 가고 싶은 곳을 적어 주세요 (선택)',
  onNext,
  disabled = false,
}: CourseInputSectionProps) {
  const inputId = 'desired-place-input';

  return (
    <>
      <section
        className="flex flex-col items-center gap-[1rem] w-full"
        aria-labelledby={`${inputId}-label`}
        role="group"
      >
        <p id={`${inputId}-label`} className="text-body-lg text-gray-700">
          {label}
        </p>

        <input
          id={inputId}
          type="text"
          placeholder={placeholder}
          aria-labelledby={`${inputId}-label`}
          aria-describedby={`${inputId}-desc`}
          className="
            w-full rounded-[2rem] py-[1.2rem] px-[1.7rem]
            text-body-md placeholder-gray-400 bg-gray-100
            border-0 outline-none
          "
        />

        <span id={`${inputId}-desc`} className="sr-only">
          선택 입력란입니다. 입력하지 않아도 다음 단계로 이동할 수 있습니다.
        </span>
      </section>

      <div className="w-full flex justify-end mt-[1rem]">
        <button
          type="button"
          onClick={onNext}
          disabled={disabled}
          className={cn(
            'flex items-center justify-center transition-opacity duration-150',
            disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-100'
          )}
          aria-label="다음 단계로 이동"
        >
          <Icon
            name="NextButton"
            size={24}
            color={disabled ? 'gray-100' : 'gray-400'}
          />
        </button>
      </div>
    </>
  );
}

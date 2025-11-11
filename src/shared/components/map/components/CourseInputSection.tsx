'use client';
import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';

interface CourseInputSectionProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  isLoading?: boolean;
}

export default function CourseInputSection({
  value,
  onChange,
  onNext,
  isLoading = false,
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
          꼭 가고 싶은 곳을 적어 주세요 <span className="text-gray-400">(선택)</span>
        </p>

        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="예: 석왕사, 카페 2개, 음식점 제외"
          aria-labelledby={`${inputId}-label`}
          aria-describedby={`${inputId}-desc`}
          className="
            w-full rounded-[2rem] py-[1.2rem] px-[1.7rem]
            text-body-md placeholder-gray-400 bg-gray-100
            border-0 outline-none
          "
          disabled={isLoading}
        />

        <span id={`${inputId}-desc`} className="sr-only">
          선택 입력란입니다. 입력하지 않아도 다음 단계로 이동할 수 있습니다.
        </span>
      </section>

      <div className="w-full flex justify-end mt-[1rem]">
        <button
          type="button"
          onClick={onNext}
          disabled={isLoading}
          className={cn(
            'flex items-center justify-center transition-opacity duration-150',
            isLoading ? 'opacity-40 cursor-not-allowed' : 'opacity-100',
          )}
          aria-label="다음 단계로 이동"
        >
          <Icon
            name="NextButton"
            size={24}
            color={isLoading ? 'gray-100' : 'gray-400'}
          />
        </button>
      </div>
    </>
  );
}

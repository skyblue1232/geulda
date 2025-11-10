'use client';

import CommonButton from '@/shared/components/button/CommonButton';

interface CourseSelectSectionProps {
  title: string;
  options: { id: string; label: string }[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

export default function CourseSelectSection({
  title,
  options,
  selected,
  onSelect,
}: CourseSelectSectionProps) {
  const sectionId = `${(title ?? '').replace(/\s+/g, '-')}-group`;

  return (
    <section
      className="flex flex-col items-center gap-[1.7rem] w-full"
      aria-labelledby={sectionId}
      role="group"
    >
      <p id={sectionId} className="text-body-lg text-gray-700">
        {title}
      </p>

      <div
        className="w-full overflow-x-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div
          className="flex justify-center gap-[0.8rem] min-w-max"
          style={{ WebkitOverflowScrolling: 'touch' }}
          role="list"
        >
          {Array.isArray(options) &&
            options.map(({ id, label }) => (
              <div role="listitem" key={id}>
                <CommonButton
                  label={label}
                  aria-pressed={selected === id}
                  variant={selected === id ? 'active' : 'default'}
                  onClick={() => onSelect(selected === id ? null : id)}
                />
              </div>
          ))}
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}

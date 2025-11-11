'use client';
import CourseSelectSection from '@/shared/components/map/components/CourseSelectSection';
import { purposes, stays, moves } from '@/shared/constants/course/courseOptions';

interface Props {
  purpose: string | null;
  stay: string | null;
  move: string | null;
  setPurpose: (value: string | null) => void;
  setStay: (value: string | null) => void;
  setMove: (value: string | null) => void;
}

export default function CourseSelectGroup({
  purpose,
  stay,
  move,
  setPurpose,
  setStay,
  setMove,
}: Props) {
  return (
    <div className="flex flex-col gap-[1.9rem] mb-[3rem]">
      <CourseSelectSection
        title="여행 목적을 선택해 주세요"
        options={purposes}
        selected={purpose}
        onSelect={setPurpose}
      />
      <CourseSelectSection
        title="체류 시간을 선택해 주세요"
        options={stays}
        selected={stay}
        onSelect={setStay}
      />
      <CourseSelectSection
        title="이동 방식을 선택해 주세요"
        options={moves}
        selected={move}
        onSelect={setMove}
      />
    </div>
  );
}

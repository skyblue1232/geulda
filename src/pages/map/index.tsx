import Image from 'next/image';
import { cn } from '@/shared/lib';
import { ControlBar } from '@/shared/components';
import { BottomNav } from '@/shared/components/tab/BottomNav';
import { useCourseSelection } from '@/shared/hooks/useCourseSelection';
import CourseSelectGroup from '@/shared/components/map/components/CourseSelectGroup';
import CourseInputSection from '@/shared/components/map/components/CourseInputSection';
import { useRouter } from 'next/router';
import { useRecommendCourse } from '@/shared/api/course/queries/useRecommendCourse';
import { useState } from 'react';

export default function CourseSettingPage() {
  const router = useRouter();
  const { mutate, isPending } = useRecommendCourse();

  const { purpose, setPurpose, stay, setStay, move, setMove } = useCourseSelection();
  const [mustVisitPlace, setMustVisitPlace] = useState('');

  const canProceed = Boolean(purpose && stay && move);

  const handleNext = () => {
    if (!canProceed) return;

    mutate(
      {
        travelPurpose: purpose!,
        stayDuration: stay!,
        transportation: move!,
        userLatitude: 37.4985,
        userLongitude: 126.7822,
        mustVisitPlace: mustVisitPlace || "",
      },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            router.push(`/map/result?sessionId=${res.result.sessionId}`);
          }
        },
        onError: (err) => {
          console.error('AI 코스 추천 실패:', err);
        },
      },
    );
  };

  return (
    <div
      className={cn(
        'relative px-[2.4rem] bg-white flex flex-col h-full pt-[1.3rem] pb-[12rem]',
      )}
      role="form"
      aria-labelledby="course-setting-title"
      aria-describedby="course-setting-desc"
    >
      <ControlBar
        isLoggedIn={false}
        onLogin={() => {}}
        userName="글다"
        className="fixed top-[1rem] left-0 right-0 z-50 px-[2rem]"
      />

      <main
        className="w-full pt-[3.4rem] flex flex-col overflow-auto"
        aria-live="polite"
      >
        <section className="mb-[3.6rem] text-center">
          <h1 id="course-setting-title" className="sr-only">
            여행 코스 설정
          </h1>
          <Image
            src="/assets/bannerMap.svg"
            alt="여행 코스 추천 배너 이미지"
            width={354}
            height={79}
            className="w-full h-auto object-cover block"
          />
          <p id="course-setting-desc" className="sr-only">
            여행 목적, 체류 시간, 이동 방식을 선택하고, 원하는 장소를 입력할 수 있습니다.
          </p>
        </section>

        <CourseSelectGroup
          purpose={purpose}
          stay={stay}
          move={move}
          setPurpose={setPurpose}
          setStay={setStay}
          setMove={setMove}
        />

        <CourseInputSection
          value={mustVisitPlace}
          onChange={setMustVisitPlace}
          onNext={handleNext}
          isLoading={isPending}
        />
      </main>

      <BottomNav />
    </div>
  );
}

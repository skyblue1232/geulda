import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { cn } from '@/shared/lib';
import { ControlBar, BottomNav, PopupSet } from '@/shared/components';
import TagGroup from '@/shared/components/map/result/components/TagGroup';
import ResultList from '@/shared/components/map/result/components/ResultList';
import ResultMap from '@/shared/components/map/result/components/ResultMap';
import { useCourseSession } from '@/shared/hooks/course/useCourseSession';

export default function CourseResultPage() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const sessionId = router.query.sessionId as string | undefined;
  const { data } = useCourseSession(sessionId ?? ''); 

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasSeenPopup = localStorage.getItem('seenCoursePopup');
    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem('seenCoursePopup', 'true');
    }
  }, []);

  useEffect(() => {
    if (router.query.from === 'map') setViewMode('map');
  }, [router.query.from]);

  const handlePopupClose = () => setShowPopup(false);

  const tags = [
    data?.travelPurpose || null,
    data?.stayDuration || null,
    data?.transportation || null,
  ].filter(Boolean) as string[];

  return (
    <div className="relative bg-white flex flex-col min-h-screen pb-[12rem] no-scrollbar">
      <ControlBar
        isLoggedIn={false}
        onLogin={() => {}}
        userName="글다"
        className="fixed top-[1rem] left-0 right-0 z-50 px-[2rem]"
      />

      <main className="relative w-full h-full pt-[6.3rem] flex flex-col overflow-hidden">
        <div className="px-[2.4rem]">
          <section className="mb-[2rem] text-center">
            <Image
              src="/assets/bannerMap.svg"
              alt="여행 결과 배너 이미지"
              width={354}
              height={79}
              className="w-full h-auto object-cover block"
            />
          </section>

          <TagGroup
            viewMode={viewMode}
            tags={tags}
            onToggleView={() =>
              setViewMode((prev) => (prev === 'list' ? 'map' : 'list'))
            }
          />

          <section
            className={cn(
              'mt-[1.4rem] w-full text-gray-600',
              viewMode === 'list'
                ? 'h-[43.6rem] overflow-y-auto no-scrollbar'
                : 'h-[43.6rem] overflow-hidden'
            )}
          >
            {viewMode === 'list' ? (
              <ResultList places={data?.places ?? []} />
            ) : (
              <ResultMap sessionId={sessionId ?? ''} places={data?.places ?? []} />
            )}
          </section>
        </div>
      </main>

      <BottomNav />

      {showPopup && (
        <PopupSet
          text="새로고침 시 결과가 초기화됩니다."
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
}

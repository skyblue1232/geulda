import { Header } from '@/shared/components';
import { useRouter } from 'next/router';
import FullMap from '@/shared/components/map/result/components/FullMap';

const MapPage = () => {
  const router = useRouter();

  const sessionId = router.query.sessionId as string | undefined;

  return (
    <main
      className="w-full h-[100vh] bg-mint-300 overflow-hidden"
      role="main"
      aria-label="코스 추천 지도 페이지"
    >
      <Header
        title="코스 추천"
        onClick={() => router.push('/map/result?from=map')}
      />

      {sessionId ? (
        <FullMap sessionId={sessionId} />
      ) : (
        <div className="flex h-full items-center justify-center text-gray-600 text-title-sm bg-gray-200">
          코스 정보가 없습니다
        </div>
      )}
    </main>
  );
};

export default MapPage;

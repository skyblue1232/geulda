import { Header } from '@/shared/components';
import { useRouter } from 'next/router';
import FullMap from '@/pages/map/result/components/FullMap';

const MapPage = () => {
  const router = useRouter();

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
      <FullMap />
    </main>
  );
};

export default MapPage;

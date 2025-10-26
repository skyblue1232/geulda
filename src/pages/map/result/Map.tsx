'use client';

import { Header } from '@/shared/components';
import router from 'next/router';
import FullMap from '@/pages/map/result/components/FullMap';

const Map = () => {
  return (
    <div className="w-full h-[100vh] bg-[#46d1cd] overflow-hidden">
      <Header
        title="코스 추천"
        onClick={() => router.push('/map/result?from=map')}
      />
      <FullMap />
    </div>
  );
};

export default Map;

'use client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Header, LocationCard, AddressCopy } from '@/shared/components';
import { useGetPlaceDetail } from '@/shared/main/queries/useGetPlaceDetail';

export default function LocationPage() {
  const router = useRouter();
  const { placeId } = router.query;

  const { data, isLoading, isError } = useGetPlaceDetail(
    router.isReady ? Number(placeId) : undefined
  );

  if (isLoading) return <p className="text-center mt-10">로딩 중...</p>;
  if (isError || !data) return <p className="text-center mt-10">데이터를 불러오지 못했습니다 😢</p>;

  const { imageUrl, placeName, description, address } = data.data;

  return (
    <div className="relative w-full h-[100vh] overflow-auto px-[2.4rem]">
      <Header title={placeName} onClick={() => router.back()} />

      <main className="relative pt-[14.3rem] gap-[1.2rem] flex flex-col">
        <Image
          src={imageUrl || '/assets/board.svg'}
          alt={placeName}
          width={354}
          height={436}
          className="w-full h-auto object-cover block rounded-[16px]"
        />

        <LocationCard
          name={placeName}
          address={address}
          description={description}
          variant="mint"
          size="large"
        />

        <AddressCopy variant="mint" value={address} />
      </main>
    </div>
  );
}

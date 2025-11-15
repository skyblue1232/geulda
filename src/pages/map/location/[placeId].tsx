'use client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Header, LocationCard, AddressCopy } from '@/shared/components';

export default function LocationPage() {
  const router = useRouter();
  const { name, imageSrc, description, address } = router.query;

  if (!router.isReady || !name) {
    return <p className="text-center mt-10">불러오는 중...</p>;
  }

  return (
    <div className="relative w-full h-[100vh] overflow-auto px-[2.4rem]">
      <Header title={String(name)} onClick={() => router.back()} />

      <main className="relative pt-[14.3rem] gap-[1.2rem] flex flex-col">
        <Image
          src={typeof imageSrc === 'string' ? imageSrc : '/assets/board.svg'}
          alt={String(name)}
          width={354}
          height={436}
          className="w-full h-auto object-cover block rounded-[16px]"
        />

        <LocationCard
          name={String(name)}
          address={String(address)}
          description={String(description)}
          variant="mint"
          size="large"
        />

        <AddressCopy variant="mint" value={String(address)} />
      </main>
    </div>
  );
}

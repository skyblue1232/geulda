import { useRouter } from 'next/router';
import Image from 'next/image';
import { Header, LocationCard, AddressCopy } from '@/shared/components';
import { useState } from 'react';
import { cn } from '@/shared/lib';

export default function LocationPage() {
  const router = useRouter();
  const { name, imageSrc, description, address } = router.query;
  const [imgLoaded, setImgLoaded] = useState(false);

  const defaultImage =
    'https://geulda-ai-video-bucket.s3.ap-southeast-2.amazonaws.com/default/blank_background.svg';

  if (!router.isReady || !name) {
    return <p className="text-center mt-10">불러오는 중...</p>;
  }

  const src =
    typeof imageSrc === 'string' ? imageSrc.trim() : defaultImage;

  return (
    <div className="relative w-full h-[100vh] overflow-auto px-[2.4rem]">
      <Header title={String(name)} onClick={() => router.back()} />

      <main className="relative pt-[14.3rem] gap-[1.2rem] flex flex-col">
        {!imgLoaded && (
          <>
            <div className="w-full h-[436px] bg-gray-200 animate-pulse rounded-[16px]" />
            <div className="mt-[1.2rem] w-full h-[12rem] bg-gray-200 animate-pulse rounded-[20px]" />
            <div className="mt-[1.2rem] w-full h-[4rem] bg-gray-200 animate-pulse rounded-[20px]" />
          </>
        )}

        <Image
          src={src}
          alt={String(name)}
          width={354}
          height={436}
          className={cn(
            'w-full h-auto object-cover block rounded-[16px] transition-opacity duration-300',
            imgLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoadingComplete={() => setImgLoaded(true)}
        />

        {imgLoaded && (
          <>
            <LocationCard
              name={String(name)}
              address={String(address)}
              description={String(description)}
              variant="mint"
              size="large"
            />

            <AddressCopy variant="mint" value={String(address)} />
          </>
        )}

      </main>
    </div>
  );
}

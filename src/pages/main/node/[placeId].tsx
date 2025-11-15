'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  AddressCopy,
  Header,
  LocationCard,
  PopupSet,
} from '@/shared/components';
import { Icon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { getLocation } from '@/shared/utils/handleGetLocation';
import { useGetPlaceDetail } from '@/shared/main/queries/useGetPlaceDetail';
import { useUserStatus } from '@/shared/hooks/useUserStatus';
import { useStampAcquire } from '@/shared/api/main/node/queries/useStampAcquire';
import { savePostcard } from '@/shared/utils/storage';
import { Skeleton } from '@/shared/components/skeleton/Skeleton';

const Node = () => {
  const router = useRouter();
  const { placeId } = router.query;
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const { isLoggedIn } = useUserStatus();

  // 이미지 로딩 상태
  const [imageLoaded, setImageLoaded] = useState(false);

  // 스켈레톤 표시 여부 (로딩이 1초 이상일 때만 true)
  const [showSkeleton, setShowSkeleton] = useState(false);

  // 스탬프 획득 훅
  const { mutate: acquireStamp } = useStampAcquire();

  // 장소 상세 조회
  const { data, isLoading, isError } = useGetPlaceDetail(
    router.isReady ? Number(placeId) : undefined,
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setTimeout(() => setShowSkeleton(true), 1000);
    } else {
      setShowSkeleton(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading && showSkeleton) {
    return (
      <div className='flex flex-col items-center justify-center px-[2.4rem] mt-10'>
        <Header title='로딩중.. ' onClick={() => router.back()} />
        <div className='mt-[10rem] flex flex-col gap-[1.2rem] w-full'>
          <Skeleton className='w-full max-w-[354px] h-[300px] rounded-[16px]' />
          <Skeleton className='w-full max-w-[354px] h-[100px] rounded-[16px]' />
          <Skeleton className='w-full max-w-[354px] h-[50px] rounded-[16px]' />
        </div>
      </div>
    );
  }

  if (isError || !data)
    return <p className='text-center mt-10'>데이터를 불러오지 못했습니다 😢</p>;

  const { isCompleted, imageUrl, placeName, description, address } = data.data;

  // 🔹 스탬프 찍기 버튼
  const handleStampClick = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    if (isCompleted) return;

    getLocation(
      (pos) => {
        const body = {
          latitude: 37.52146604044732, 
          longitude: 126.76740151260397,
          // 실제 위치 사용 시:
          // latitude: pos.coords.latitude,
          // longitude: pos.coords.longitude,
        };
        const placeIdNum = Number(placeId);

        acquireStamp(
          { placeId: placeIdNum, body },
          {
            onSuccess: (res) => {
              const { postcard } = res.data;
              savePostcard(postcard);

              router.push({
                pathname: '/main/videoPlay',
                query: { placeName: postcard.placeName },
              });
            },
            onError: (err) => {
              console.error('스탬프 획득 실패:', err);
              setShowErrorPopup(true);
            },
          },
        );
      },
      (err) => {
        console.error('위치 정보를 가져올 수 없습니다:', err.message);
      },
    );
  };

  return (
    <div className='relative w-full h-[100vh] overflow-auto px-[2.4rem]'>
      <Header title={placeName} onClick={() => router.back()} />

      <main
        className='relative pt-[14.3rem] gap-[1.2rem] flex flex-col'
        role='main'
        aria-label={`${placeName} 상세 페이지`}
      >
        <section className='relative w-full h-[43rem]'>
          <div className='relative w-full h-full rounded-[16px] overflow-hidden'>
            {!imageLoaded && (
              <Skeleton className='absolute inset-0 w-full h-full rounded-[16px] animate-pulse bg-gradient-to-br from-gray-200 to-gray-100' />
            )}

            <Image
              src={imageUrl || '/assets/board.svg'}
              alt={placeName}
              fill
              onLoadingComplete={() => setImageLoaded(true)}
              className={cn(
                'object-cover rounded-[16px] transition-opacity duration-500',
                !isCompleted && 'blur-xs brightness-90',
                imageLoaded ? 'opacity-100' : 'opacity-0',
              )}
            />
          </div>

          {imageLoaded && (
            <button
              aria-label={isCompleted ? '스탬프 획득 완료' : '스탬프 찍기'}
              className={cn(
                'absolute bottom-0 right-0',
                isCompleted && 'p-[2.5rem]',
                imageLoaded ? 'opacity-100' : 'opacity-0 h-0',
              )}
              onClick={handleStampClick}
            >
              <Icon
                name={isCompleted ? 'Stamp' : 'PressStamp'}
                color={isCompleted ? 'pink-400' : 'gray-50'}
                size={isCompleted ? 100 : 160}
                aria-hidden='true'
              />
            </button>
          )}
        </section>

        <LocationCard
          name={placeName}
          address={address}
          description={description}
          variant='mint'
          size='large'
        />
        <AddressCopy variant='mint' value={address} />
      </main>

      {/* 팝업 영역 */}
      {showLoginPopup && (
        <PopupSet
          text='로그인이 필요한 서비스입니다.'
          onClose={() => {
            setShowLoginPopup(false);
            router.push('/auth');
          }}
        />
      )}

      {showErrorPopup && (
        <PopupSet
          text='해당 위치를 다시 확인해 주세요.'
          onClose={() => setShowErrorPopup(false)}
        />
      )}
    </div>
  );
};

export default Node;

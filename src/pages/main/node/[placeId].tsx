'use client';
import { useState } from 'react';
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

const Node = () => {
  const router = useRouter();
  const { placeId } = router.query;
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false); 
  const { isLoggedIn } = useUserStatus();

  // 스탬프 획득 훅
  const { mutate: acquireStamp } = useStampAcquire();

  // 장소 상세 조회 
  const { data, isLoading, isError } = useGetPlaceDetail(
    router.isReady ? Number(placeId) : undefined,
  );

  if (isLoading) return <p className='text-center mt-10'>로딩 중...</p>;
  if (isError || !data)
    return <p className='text-center mt-10'>데이터를 불러오지 못했습니다 😢</p>;

  const { isCompleted, imageUrl, placeName, description, address } = data.data;

  // 스탬프 찍기 버튼 클릭 핸들러
  const handleStampClick = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    if (isCompleted) return;

    // 위치 가져와서 API 호출
    getLocation(
      (pos) => {
        const body = {
          // 하드 코딩
          latitude: 37.48585193654532,
          longitude: 126.80355242431538,
          // 실제
          // latitude: pos.coords.latitude,
          // longitude: pos.coords.longitude,
        };
        const placeIdNum = Number(placeId);

        console.log('📍 현재 위치:', body);

        acquireStamp(
          { placeId: placeIdNum, body },
          {
            onSuccess: (res) => {
              console.log('스탬프 획득 성공:', res.data);

              const { postcard } = res.data;
              const { hidden } = postcard;

              // 항상 videoPlay로 이동하되, hidden이 true면 쿼리로 전달
              router.push({
                pathname: `/main/videoPlay`,
                query: {
                  placeName: postcard.placeName,
                  ...(hidden ? { hidden: 'true' } : {}),
                },
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
        <section className='relative w-full'>
          <Image
            src={imageUrl || '/assets/board.svg'}
            alt={placeName}
            width={354}
            height={436}
            className={cn(
              'w-full h-auto object-cover block rounded-[16px] transition-all duration-300',
              !isCompleted && 'blur-xs brightness-90',
            )}
          />

          <button
            aria-label={isCompleted ? '스탬프 획득 완료' : '스탬프 찍기'}
            className={cn(
              'absolute bottom-0 right-0',
              isCompleted && 'p-[2.5rem]',
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

      {/* 로그인 필요 팝업 */}
      {showLoginPopup && (
        <PopupSet
          text='로그인이 필요한 서비스입니다.'
          onClose={() => {
            setShowLoginPopup(false);
            router.push('/auth');
          }}
        />
      )}

      {/* 위치 에러 팝업 */}
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

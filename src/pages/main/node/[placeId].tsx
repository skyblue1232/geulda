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
// import { useGetPlaceDetail } from '@/shared/main/queries/useGetPlaceDetail';
import { useUserStatus } from '@/shared/hooks/useUserStatus';
import { getMemberIdFromToken } from '@/shared/utils/token';

const Node = () => {
  const router = useRouter();
  const { placeId } = router.query;
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { isLoggedIn } = useUserStatus();

  // 임시 데이터
  const placeName = '장소 이름';
  const imageUrl = '';
  const isCompleted = false;
  const description = '장소 설명이 여기에 표시됩니다.';
  const address = '서울특별시 강남구 테헤란로 123';

  // ✅ JWT에서 memberId 추출
  const memberId = getMemberIdFromToken();

  // ✅ React Query — placeId와 memberId 모두 있을 때만 실행
  // const { data, isLoading, isError } = useGetPlaceDetail(
  //   router.isReady ? Number(placeId) : undefined,
  //   memberId ?? undefined,
  // );

  console.log('📍 장소 ID:', placeId);
  console.log('👤 사용자 ID:', memberId);

  //주석 처리된 부분 복원 예정
  // console.log('📍 장소 상세 데이터:', data);

  // if (isLoading) return <p className='text-center mt-10'>로딩 중...</p>;
  // if (isError || !data)
  //   return <p className='text-center mt-10'>데이터를 불러오지 못했습니다 😢</p>;

  // const { isCompleted, imageUrl, placeName, description, address } = data.data;

  const handleStampClick = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    getLocation(
      (pos) => console.log('📍 현재 위치:', pos.coords),
      (err) => console.error('⚠️ 위치 에러:', err.message),
    );
    router.push('/main/HiddenReward');
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

      {showLoginPopup && (
        <PopupSet
          text='로그인이 필요한 서비스입니다.'
          onClose={() => {
            setShowLoginPopup(false);
            router.push('/auth');
          }}
        />
      )}
    </div>
  );
};

export default Node;

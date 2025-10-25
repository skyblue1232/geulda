import CummonButton from '@/shared/components/button/CommonButton';
import { useState } from 'react';

export default function CourseSettingPreview() {
  const [active, setActive] = useState<string | null>(null);

  const buttons = [
    { id: 'family', label: '가족여행' },
    { id: 'friends', label: '우정여행' },
    { id: 'date', label: '데이트' },
    { id: 'solo', label: '당일치기' },
    { id: 'oneNight', label: '1박2일' },
    { id: 'twoNight', label: '2박3일' },
    { id: 'walk', label: '도보' },
    { id: 'transit', label: '대중교통' },
    { id: 'car', label: '자가차' },
  ];

  return (
    // 스타일은 다 수정할 거에요 버튼만 봐주세요~  // CommonButton.tsx 저것만 확인해주세요
    <div className="flex flex-col items-center gap-6 py-10">
      <h1 className="text-title-lg text-gray-700 mb-4">코스 버튼 임시 화면</h1>
      <div className="flex flex-wrap justify-center gap-4 max-w-[400px]">  
        {buttons.map(({ id, label }) => (
          <CummonButton
            key={id}
            label={label}
            variant={active === id ? 'active' : 'default'}
            onClick={() => setActive(active === id ? null : id)}
          />
        ))}
      </div>
    </div>
  );
}

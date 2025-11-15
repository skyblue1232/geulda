'use client';
import { Tag } from '@/shared/components';
import { cn } from '@/shared/lib';

interface TagGroupProps {
  viewMode: 'list' | 'map';
  tags: string[];
  onToggleView: () => void;
}

export default function TagGroup({ viewMode, tags, onToggleView }: TagGroupProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between w-full gap-[0.4rem] flex-wrap'
      )}
    >
      <div className="flex gap-[0.4rem] flex-wrap">
        {tags.length > 0 ? (
          tags.map((tag) => <Tag key={tag} label={tag} variant="hash" />)
        ) : (
          <span className="text-gray-400 text-body-sm">태그 정보 없음</span>
        )}
      </div>

      <Tag
        label={viewMode === 'list' ? '지도로 보기' : '리스트로 보기'}
        icon={viewMode === 'list' ? 'MapPin_' : 'ListButton'}
        variant="toggle"
        onClick={onToggleView}
        aria-pressed={viewMode === 'list'}
        aria-label={
          viewMode === 'list'
            ? '현재 리스트 보기입니다. 지도로 전환하려면 클릭하세요.'
            : '현재 지도 보기입니다. 리스트로 전환하려면 클릭하세요.'
        }
      />
    </div>
  );
}

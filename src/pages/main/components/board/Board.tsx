'use client';

import React from 'react';
import { cn } from '@/shared/lib';

/** 1-based row/col (grid 4 x 7) */
type RC = { r: number; c: number };

/** 각 타일 모서리 라운드 지정 */
type Corners = Partial<{
  tl: number; // px
  tr: number;
  bl: number;
  br: number;
}>;

type Tile = {
  pos: RC; // 위치
  span?: { r?: number; c?: number }; // 필요하면 스팬
  corners?: Corners; // 모서리 라운드
  label?: string; // 타일 텍스트(필요시)
};

const R = (v: number) => `${v}px`;

/**
 * 경로 정의(예시)
 * 이미지처럼 S자 트랙을 만들기 위해 좌표와 모서리 라운드를 기록한다.
 * 필요하면 corners 값을 조정하면서 모서리 라운드를 미세 튜닝하면 돼.
 */
const TILES: Tile[] = [
  // 상단 가로 3칸
  { pos: { r: 1, c: 1 }, corners: { tl: 28 } },
  { pos: { r: 1, c: 2 } },
  { pos: { r: 1, c: 3 } },
  // 우상단 코너 & 하향
  { pos: { r: 1, c: 4 }, corners: { tr: 28 } },
  { pos: { r: 2, c: 4 } },
  { pos: { r: 3, c: 4 }, corners: { br: 28 } },

  // 가운데 가로(오른쪽→왼쪽)
  { pos: { r: 3, c: 3 } },
  { pos: { r: 3, c: 2 } },
  { pos: { r: 3, c: 1 }, corners: { tl: 28 } },

  // 좌측 아래로(코너 후 ↓)
  { pos: { r: 4, c: 1 } },
  { pos: { r: 5, c: 1 }, corners: { bl: 28 } },

  // 하단 가로(왼쪽→오른쪽)
  { pos: { r: 5, c: 2 } },
  { pos: { r: 5, c: 3 } },
  { pos: { r: 5, c: 4 }, corners: { br: 28 } },

  // 우측 상향(코너 후 ↑)
  { pos: { r: 4, c: 4 } },
  { pos: { r: 3, c: 4 } }, // 이미 있음(중복 놓치지 않게 필요시 제거)
  // 마지막 세로로 내려 끝
  { pos: { r: 6, c: 4 } },
  { pos: { r: 7, c: 4 }, corners: { br: 28 } },
];

/**
 * 모서리 라운드를 인라인 스타일로 변환
 */
function cornersStyle(c?: Corners): React.CSSProperties | undefined {
  if (!c) return;
  const style: React.CSSProperties = {};
  if (c.tl) style.borderTopLeftRadius = R(c.tl);
  if (c.tr) style.borderTopRightRadius = R(c.tr);
  if (c.bl) style.borderBottomLeftRadius = R(c.bl);
  if (c.br) style.borderBottomRightRadius = R(c.br);
  return style;
}

/**
 * 보드판(타일만) 컴포넌트
 * props.gapPx로 타일 사이 간격을 조절 가능
 */
export default function BoardPath({
  className,
  gapPx = 8,
  showGrid = false, // 디버그용 그리드 표시
}: {
  className?: string;
  gapPx?: number;
  showGrid?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative w-full',
        // 4 x 7 그리드
        'grid',
        'grid-cols-4',
        'grid-rows-7',
        className,
      )}
      style={{ gap: `${gapPx}px` }}
    >
      {/* 디버그용 빨간 그리드 (옵션) */}
      {showGrid && (
        <>
          {Array.from({ length: 4 * 7 }).map((_, i) => (
            <div
              key={`g-${i}`}
              className='border border-red-500/50'
              aria-hidden
            />
          ))}
          {/* 실제 타일은 absolute로 올릴 수도 있지만
              여기선 같은 grid context에 올려도 ok */}
        </>
      )}

      {/* 트랙 타일 */}
      {TILES.map((t, idx) => (
        <div
          key={`tile-${t.pos.r}-${t.pos.c}-${idx}`}
          style={{
            gridColumn: `${t.pos.c} / span ${t.span?.c ?? 1}`,
            gridRow: `${t.pos.r} / span ${t.span?.r ?? 1}`,
            ...cornersStyle(t.corners),
          }}
          className={cn(
            // 타일 베이스 스타일
            'bg-[#F7E6C9]',
            'shadow-[inset_0_0_0_6px_rgba(255,255,255,0.85)]', // 안쪽 흰 라인 느낌
            'outline  outline-[#EACFA3]', // 바깥 라인 느낌
            'min-h-[64px]', // 타일 세로 최소치(컨테이너 높이에 따라 변함)
          )}
        >
          {/* 필요하면 라벨 */}
          {t.label && (
            <div className='flex h-full items-center justify-center text-[#A68452] text-title-sm'>
              {t.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

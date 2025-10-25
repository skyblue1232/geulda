'use client';

import React from 'react';
import { cn } from '@/shared/lib';

// ✅ 각 칸 정보 타입
interface BoardCell {
  active: boolean;
  color?: string;
  label?: string;
}

type BoardData = BoardCell[][];

interface BoardPathProps {
  boardData: BoardData;
  radius?: number;
  cellSize?: number;
  className?: string;
}

// 보드 경계 확인용 헬퍼
const get = (m: BoardData, r: number, c: number): BoardCell | null =>
  r < 0 || c < 0 || r >= m.length || c >= m[0].length ? null : m[r][c];

// corner rounding 계산 함수
function cornerStyle(
  m: BoardData,
  r: number,
  c: number,
  radiusPx: number,
): React.CSSProperties {
  const cell = get(m, r, c);
  if (!cell || !cell.active) return {};

  // 상하좌우
  const up = get(m, r - 1, c)?.active;
  const down = get(m, r + 1, c)?.active;
  const left = get(m, r, c - 1)?.active;
  const right = get(m, r, c + 1)?.active;

  // 대각선
  const nw = get(m, r - 1, c - 1)?.active;
  const ne = get(m, r - 1, c + 1)?.active;
  const sw = get(m, r + 1, c - 1)?.active;
  const se = get(m, r + 1, c + 1)?.active;

  const style: React.CSSProperties = {};
  const deg = (up ? 1 : 0) + (right ? 1 : 0) + (down ? 1 : 0) + (left ? 1 : 0);

  const isOrthogonalTwo = deg === 2 && !((up && down) || (left && right));

  if (isOrthogonalTwo) {
    if (up && left && !nw) {
      style.borderBottomRightRadius = radiusPx;
    } else if (up && right && !ne) {
      style.borderBottomLeftRadius = radiusPx;
    } else if (down && right && !se) {
      style.borderTopLeftRadius = radiusPx;
    } else if (down && left && !sw) {
      style.borderTopRightRadius = radiusPx;
    }
  }

  return style;
}

export default function BoardPathFromMatrix({
  boardData,
  radius = 500,
  cellSize = 90,
  className,
}: BoardPathProps) {
  const rows = boardData.length;
  const cols = boardData[0]?.length ?? 0;

  return (
    <div
      className={cn('grid ', className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
      }}
    >
      {boardData.map((row, r) =>
        row.map((cell, c) => {
          const style = cell.active ? cornerStyle(boardData, r, c, radius) : {};
          return (
            <div
              key={`cell-${r}-${c}`}
              className={cn(
                'flex items-center justify-center text-sm font-medium border border-transparent text-center',
                cell.active ? '' : 'bg-transparent',
              )}
              style={{
                backgroundColor: cell.active
                  ? cell.color ?? '#F7E6C9'
                  : 'transparent',
                ...style,
              }}
            >
              {cell.active && cell.label}
            </div>
          );
        }),
      )}
    </div>
  );
}

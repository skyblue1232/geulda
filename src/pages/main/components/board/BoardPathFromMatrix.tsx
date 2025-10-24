'use client';

import React from 'react';
import { cn } from '@/shared/lib';

type Matrix = (0 | 1)[][];

interface BoardPathProps {
  matrix: Matrix;
  gap?: number;
  radius?: number;
  cellSize?: number;
  className?: string;
}

const get = (m: Matrix, r: number, c: number) =>
  r < 0 || c < 0 || r >= m.length || c >= m[0].length ? 0 : m[r][c];
function cornerStyle(
  m: Matrix,
  r: number,
  c: number,
  radiusPx: number,
): React.CSSProperties {
  if (get(m, r, c) !== 1) return {};

  // 상하좌우
  const up = get(m, r - 1, c) === 1;
  const down = get(m, r + 1, c) === 1;
  const left = get(m, r, c - 1) === 1;
  const right = get(m, r, c + 1) === 1;

  // 대각
  const nw = get(m, r - 1, c - 1) === 1;
  const ne = get(m, r - 1, c + 1) === 1;
  const sw = get(m, r + 1, c - 1) === 1;
  const se = get(m, r + 1, c + 1) === 1;

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
  matrix,
  gap = 8,
  radius = 28,
  cellSize = 90,
  className,
}: BoardPathProps) {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;

  return (
    <div
      className={cn('grid', className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        gap: `${gap}px`,
      }}
    >
      {matrix.map((row, r) =>
        row.map((cell, c) => {
          const isTile = cell === 1;
          const style = isTile ? cornerStyle(matrix, r, c, radius) : undefined;
          return (
            <div
              key={`cell-${r}-${c}`}
              className={cn(
                isTile
                  ? 'bg-[#F7E6C9]  outline-2 outline-[#EACFA3] shadow-[inset_0_0_0_6px_rgba(255,255,255,0.85)]'
                  : 'bg-transparent',
              )}
              style={style}
            />
          );
        }),
      )}
    </div>
  );
}

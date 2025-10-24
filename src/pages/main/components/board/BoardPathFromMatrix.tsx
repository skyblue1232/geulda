'use client';

import React from 'react';
import { cn } from '@/shared/lib';

type Matrix = (0 | 1)[][];

interface BoardPathProps {
  matrix: Matrix;
  gap?: number;
  radius?: number;
  cellSize?: number;
  debugGrid?: boolean;
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
  const up = get(m, r - 1, c) === 1;
  const down = get(m, r + 1, c) === 1;
  const left = get(m, r, c - 1) === 1;
  const right = get(m, r, c + 1) === 1;
  const nw = get(m, r - 1, c - 1) === 1;
  const ne = get(m, r - 1, c + 1) === 1;
  const sw = get(m, r + 1, c - 1) === 1;
  const se = get(m, r + 1, c + 1) === 1;

  const style: React.CSSProperties = {};
  if (up && left && !nw) style.borderTopLeftRadius = radiusPx;
  if (up && right && !ne) style.borderTopRightRadius = radiusPx;
  if (down && right && !se) style.borderBottomRightRadius = radiusPx;
  if (down && left && !sw) style.borderBottomLeftRadius = radiusPx;

  const deg = [up, right, down, left].filter(Boolean).length;
  if (deg === 1) {
    if (up) {
      style.borderBottomLeftRadius = radiusPx;
      style.borderBottomRightRadius = radiusPx;
    } else if (down) {
      style.borderTopLeftRadius = radiusPx;
      style.borderTopRightRadius = radiusPx;
    } else if (left) {
      style.borderTopRightRadius = radiusPx;
      style.borderBottomRightRadius = radiusPx;
    } else if (right) {
      style.borderTopLeftRadius = radiusPx;
      style.borderBottomLeftRadius = radiusPx;
    }
  }
  return style;
}

export default function BoardPathFromMatrix({
  matrix,
  gap = 8,
  radius = 28,
  cellSize = 90, // ★ 기본 90px
  debugGrid = false,
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
                debugGrid && 'outline outline-1 outline-red-400/40',
                isTile
                  ? 'bg-[#F7E6C9] outline outline-2 outline-[#EACFA3] shadow-[inset_0_0_0_6px_rgba(255,255,255,0.85)]'
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

'use client';
import React from 'react';
import { cn } from '@/shared/lib';

interface BoardCell {
  active: boolean;
}

type BoardData = BoardCell[][];

interface BoardPathBackgroundProps {
  boardData: BoardData;
  cellSize?: number;
  expand?: number; // ✅ 셀 크기 확장량 (외곽 강조용)
  color?: string; // ✅ 외곽선 색
  className?: string;
}

const get = (m: BoardData, r: number, c: number) =>
  r < 0 || c < 0 || r >= m.length || c >= m[0].length ? null : m[r][c];

export default function BoardPathBackground({
  boardData,
  cellSize = 90,
  expand = 16,
  color = 'pink-50',
  className,
}: BoardPathBackgroundProps) {
  const rows = boardData.length;
  const cols = boardData[0]?.length ?? 0;

  return (
    <div
      className={cn('grid ', className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        zIndex: 0,
      }}
    >
      {boardData.map((row, r) =>
        row.map((cell, c) =>
          cell.active ? (
            <div
              key={`bg-${r}-${c}`}
              style={{
                width: cellSize + expand,
                height: cellSize + expand,
                backgroundColor: color,
                borderRadius: expand / 2,
                transform: `translate(-${expand / 2}px, -${expand / 2}px)`,
              }}
            />
          ) : (
            <div key={`bg-${r}-${c}`} />
          ),
        ),
      )}
    </div>
  );
}

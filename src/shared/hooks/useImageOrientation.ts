'use client';
import { useState, useEffect } from 'react';

export const useImageOrientation = (src?: string) => {
  const [orientation, setOrientation] = useState<
    'portrait' | 'landscape' | 'square'
  >('square');
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      const { width, height } = img;
      setSize({ width, height });

      const ratio = width / height;
      if (ratio > 1) setOrientation('landscape');
      else if (ratio < 1) setOrientation('portrait');
      else setOrientation('square');
    };
  }, [src]);

  return { orientation, size };
};

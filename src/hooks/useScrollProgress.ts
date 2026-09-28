'use client';

import { useState, useEffect, useRef } from 'react';
import { clamp } from '@/lib/utils';

export function useScrollProgress(offset: number = 0): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY + offset;
      setProgress(clamp(scrollTop / scrollHeight, 0, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return progress;
}

export function useElementScrollProgress(threshold: number = 0): {
  ref: React.RefObject<HTMLDivElement | null>;
  progress: number;
} {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      const start = windowHeight - threshold;
      const end = -elementHeight + threshold;
      const range = start - end;
      const current = start - elementTop;

      setProgress(clamp(current / range, 0, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { ref, progress };
}

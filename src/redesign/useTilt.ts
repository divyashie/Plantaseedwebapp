import { useCallback, useRef } from 'react';

/**
 * Pointer-tracked 3D tilt. Sets --tilt-x/--tilt-y custom properties for CSS
 * to consume (see .ps-plant-img). No-ops under prefers-reduced-motion.
 */
export function useTilt<T extends HTMLElement>(maxDeg = 10) {
  const ref = useRef<T>(null);
  const reduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el || reduced.current) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--tilt-x', `${(-py * maxDeg).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${(px * maxDeg).toFixed(2)}deg`);
    },
    [maxDeg]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
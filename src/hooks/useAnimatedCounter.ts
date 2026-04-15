import { useState, useEffect, useRef } from "react";

export function useAnimatedCounter(target: number, duration = 800) {
  const [display, setDisplay] = useState(target);
  const animRef = useRef<number>();
  const startRef = useRef(display);

  useEffect(() => {
    const start = startRef.current;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + diff * eased;
      setDisplay(parseFloat(current.toFixed(2)));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        startRef.current = target;
      }
    };

    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [target, duration]);

  return display;
}

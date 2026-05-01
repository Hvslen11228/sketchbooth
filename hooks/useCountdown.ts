"use client";
import { useState, useCallback, useRef } from "react";

export function useCountdown() {
  const [count, setCount] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Run countdown from `from` down to 0, then call onDone */
  const startCountdown = useCallback((from: number, onDone: () => void) => {
    setCount(from);
    let current = from;
    const tick = () => {
      current -= 1;
      if (current <= 0) {
        setCount(null);
        onDone();
      } else {
        setCount(current);
        timerRef.current = setTimeout(tick, 1000);
      }
    };
    timerRef.current = setTimeout(tick, 1000);
  }, []);

  const cancel = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCount(null);
  }, []);

  return { count, startCountdown, cancel };
}

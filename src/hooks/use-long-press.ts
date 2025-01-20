import { useCallback } from 'react';

interface LongPressOptions {
  threshold?: number;
  onFinish?: (e: React.MouseEvent | React.TouchEvent) => void;
}

export const useLongPress = (
  callback: () => void,
  { threshold = 500, onFinish }: LongPressOptions = {}
) => {
  let pressTimer: NodeJS.Timeout | null = null;

  const start = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    pressTimer = setTimeout(() => {
      callback();
      if (onFinish) onFinish(e);
    }, threshold);
  }, [callback, threshold, onFinish]);

  const cancel = useCallback(() => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
  };
}; 
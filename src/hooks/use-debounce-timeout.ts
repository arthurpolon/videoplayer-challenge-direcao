import { useRef } from 'react';

export function useDebounceTimeout(
  callback: (...callbackParams: any[]) => void,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const start = (...callbackParams: any[]) => {
    clear();

    timeoutRef.current = setTimeout(() => {
      callback(callbackParams);
    }, delay);
  };

  return { start, clear };
}

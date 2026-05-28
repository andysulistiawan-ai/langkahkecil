import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@/utils/constants';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // quota exceeded or other error
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

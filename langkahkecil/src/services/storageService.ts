import { STORAGE_KEYS } from '@/utils/constants';

export const storageService = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  },

  getSize(): number {
    let total = 0;
    for (const key in localStorage) {
      if (key.startsWith('langkahkecil:')) {
        total += localStorage[key].length * 2;
      }
    }
    return total;
  },
};

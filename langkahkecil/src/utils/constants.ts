export const TASK_COLORS = ['blue', 'coral', 'mint', 'yellow', 'purple', 'gray'] as const;

export const DEFAULT_CATEGORIES = [
  { id: 'd1', name: 'Makanan', icon: '🍜' },
  { id: 'd3', name: 'Belanja', icon: '🛒' },
  { id: 'd4', name: 'Gaji', icon: '💰' },
  { id: 'd5', name: 'Hiburan', icon: '🎭' },
  { id: 'd6', name: 'Utilities', icon: '💡' },
];

export const STORAGE_KEYS = {
  TASKS: 'langkahkecil:tasks',
  TRANSACTIONS: 'langkahkecil:transactions',
  WEIGHTS: 'langkahkecil:weights',
  CATEGORIES: 'langkahkecil:categories',
  SETTINGS: 'langkahkecil:settings',
  SYNC_QUEUE: 'langkahkecil:sync-queue',
  METADATA: 'langkahkecil:metadata',
};

export const COLOR_MAP: Record<string, string> = {
  blue: '#3B82F6',
  coral: '#FF8B7B',
  mint: '#86EFAC',
  yellow: '#FCD34D',
  purple: '#A78BFA',
  gray: '#9CA3AF',
};

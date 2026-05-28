import { useCallback } from 'react';
import { useStore } from '@/store';
import { SyncRecord } from '@/types';

export function useSyncQueue() {
  const syncQueue = useStore((s) => s.syncQueue);
  const addToQueue = useStore((s) => s.addToQueue);
  const clearQueue = useStore((s) => s.clearQueue);

  const enqueue = useCallback(
    (record: SyncRecord) => {
      addToQueue(record);
    },
    [addToQueue]
  );

  return { syncQueue, enqueue, clearQueue };
}

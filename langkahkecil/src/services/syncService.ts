import { useStore } from '@/store';
import { AppScriptService } from './appScriptService';

export async function syncData(url: string) {
  const store = useStore.getState();
  const service = new AppScriptService(url);
  const queue = store.syncQueue;

  try {
    await service.init();
  } catch {
    return { success: false, error: 'Connection failed' };
  }

  if (queue.length === 0) {
    return { success: true };
  }

  try {
    await service.sync(queue);
    store.clearQueue();
    store.updateSettings({ lastSyncAt: new Date().toISOString() });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

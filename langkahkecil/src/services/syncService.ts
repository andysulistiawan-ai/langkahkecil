import { useStore } from '@/store';
import { AppScriptService } from './appScriptService';

export async function syncData(url: string) {
  const store = useStore.getState();
  const service = new AppScriptService(url);
  const queue = store.syncQueue;

  if (queue.length === 0) {
    try {
      await service.init();
      const tasks = await service.fetchCollection('Tasks');
      return { success: true };
    } catch {
      return { success: false, error: 'Connection failed' };
    }
  }

  try {
    const tasks = store.tasks;
    const transactions = store.transactions;
    const weights = store.weights;

    for (const task of tasks) {
      await service.create('Tasks', {
        id: task.id,
        name: task.name,
        color: task.color,
        order: task.order,
        done: task.done,
        created_at: task.createdAt,
        updated_at: task.updatedAt,
      });
    }
    for (const tx of transactions) {
      await service.create('Transactions', {
        id: tx.id,
        type: tx.type,
        amount: tx.amount,
        category: tx.category,
        note: tx.note || '',
        date: tx.date,
        created_at: tx.createdAt,
        updated_at: tx.updatedAt,
      });
    }
    for (const w of weights) {
      await service.create('Weight', {
        id: w.id,
        weight: w.weight,
        food_notes: w.foodNotes || '',
        date: w.date,
        created_at: w.createdAt,
        updated_at: w.updatedAt,
      });
    }

    store.clearQueue();
    store.updateSettings({ lastSyncAt: new Date().toISOString() });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

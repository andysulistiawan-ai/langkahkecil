import { useStore } from '@/store';
import { AppScriptService } from './appScriptService';
import { Task, Transaction, WeightLog } from '@/types';

function toLocalDate(val: any): string {
  if (!val) return new Date().toISOString().split('T')[0];
  if (typeof val === 'string' && val.length === 10) return val;
  const d = new Date(val);
  if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function toLocalISO(val: any): string {
  if (!val) return new Date().toISOString();
  const d = new Date(val);
  if (isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
}

function mapTask(row: any): Task {
  return {
    id: row.id,
    name: row.name,
    color: row.color,
    order: Number(row.order),
    done: row.done === true || row.done === 'true',
    createdAt: toLocalISO(row.created_at || row.createdAt),
    updatedAt: toLocalISO(row.updated_at || row.updatedAt),
  };
}

function mapTransaction(row: any): Transaction {
  return {
    id: row.id,
    type: row.type,
    amount: Number(row.amount),
    category: row.category,
    note: row.note || undefined,
    date: toLocalDate(row.date),
    createdAt: toLocalISO(row.created_at || row.createdAt),
    updatedAt: toLocalISO(row.updated_at || row.updatedAt),
  };
}

function toSnake(data: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key of Object.keys(data)) {
    const snake = key.replace(/[A-Z]/g, (l) => `_${l.toLowerCase()}`);
    result[snake] = data[key];
  }
  return result;
}

function mapWeight(row: any): WeightLog {
  return {
    id: row.id,
    weight: Number(row.weight),
    foodNotes: row.food_notes || row.foodNotes || undefined,
    date: toLocalDate(row.date),
    createdAt: toLocalISO(row.created_at || row.createdAt),
    updatedAt: toLocalISO(row.updated_at || row.updatedAt),
  };
}

export async function syncData(url: string) {
  const store = useStore.getState();
  const service = new AppScriptService(url);

  try {
    await service.init();
  } catch {
    return { success: false, error: 'Connection failed' };
  }

  const tasksRes = await service.pullCollection('Tasks');
  const txRes = await service.pullCollection('Transactions');
  const weightRes = await service.pullCollection('Weight');

  if (tasksRes.success && tasksRes.data && tasksRes.data.length > 0 && store.tasks.length === 0) {
    useStore.setState({ tasks: tasksRes.data.map(mapTask) });
  }

  if (txRes.success && txRes.data && txRes.data.length > 0 && store.transactions.length === 0) {
    useStore.setState({ transactions: txRes.data.map(mapTransaction) });
  }

  if (weightRes.success && weightRes.data && weightRes.data.length > 0 && store.weights.length === 0) {
    useStore.setState({ weights: weightRes.data.map(mapWeight) });
  }

  const queue = useStore.getState().syncQueue.map((r) => ({
    ...r,
    data: r.data ? toSnake(r.data) : undefined,
  }));
  if (queue.length > 0) {
    try {
      await service.sync(queue);
      useStore.getState().clearQueue();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  useStore.getState().updateSettings({ lastSyncAt: new Date().toISOString() });
  return { success: true };
}

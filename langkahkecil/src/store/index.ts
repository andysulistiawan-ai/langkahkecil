import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Transaction, WeightLog, Category, UserSettings, SyncRecord, Tab, TaskColor } from '@/types';
import { DEFAULT_CATEGORIES } from '@/utils/constants';
import { generateId } from '@/utils/uuid';

interface AppStore {
  tasks: Task[];
  transactions: Transaction[];
  weights: WeightLog[];
  categories: Category[];
  settings: UserSettings;
  syncQueue: SyncRecord[];
  activeTab: Tab;
  isOnline: boolean;

  setActiveTab: (tab: Tab) => void;
  setOnline: (online: boolean) => void;

  addTask: (name: string, color: TaskColor) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
  toggleTaskDone: (id: string) => void;

  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;

  addWeight: (log: Omit<WeightLog, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateWeight: (id: string, updates: Partial<WeightLog>) => void;
  deleteWeight: (id: string) => void;

  addCategory: (name: string, icon: string) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  addToQueue: (record: SyncRecord) => void;
  clearQueue: () => void;
  resetAll: () => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      transactions: [],
      weights: [],
      categories: DEFAULT_CATEGORIES,
      settings: { theme: 'light', language: 'id', offlineMode: false },
      syncQueue: [],
      activeTab: 'tasks',
      isOnline: navigator.onLine,

      setActiveTab: (tab) => set({ activeTab: tab }),
      setOnline: (online) => set({ isOnline: online }),

      addTask: (name, color) => {
        const now = new Date().toISOString();
        const task: Task = {
          id: generateId(),
          name,
          color,
          order: get().tasks.length,
          done: false,
          createdAt: now,
          updatedAt: now,
        };
        set({ tasks: [...get().tasks, task] });
        get().addToQueue({ action: 'create', collection: 'Tasks', id: task.id, data: task });
      },

      updateTask: (id, updates) => {
        const updatedAt = new Date().toISOString();
        set({
          tasks: get().tasks.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt } : t
          ),
        });
        get().addToQueue({ action: 'update', collection: 'Tasks', id, data: { ...updates, updatedAt } });
      },

      deleteTask: (id) => {
        set({ tasks: get().tasks.filter((t) => t.id !== id) });
        get().addToQueue({ action: 'delete', collection: 'Tasks', id });
      },

      reorderTasks: (tasks) => set({ tasks }),

      toggleTaskDone: (id) => {
        set({
          tasks: get().tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done, updatedAt: new Date().toISOString() } : t
          ),
        });
      },

      addTransaction: (data) => {
        const now = new Date().toISOString();
        const transaction: Transaction = {
          ...data,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        };
        set({ transactions: [...get().transactions, transaction] });
        get().addToQueue({ action: 'create', collection: 'Transactions', id: transaction.id, data: transaction });
      },

      updateTransaction: (id, updates) => {
        const updatedAt = new Date().toISOString();
        set({
          transactions: get().transactions.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt } : t
          ),
        });
        get().addToQueue({ action: 'update', collection: 'Transactions', id, data: { ...updates, updatedAt } });
      },

      deleteTransaction: (id) => {
        set({ transactions: get().transactions.filter((t) => t.id !== id) });
        get().addToQueue({ action: 'delete', collection: 'Transactions', id });
      },

      addWeight: (data) => {
        const now = new Date().toISOString();
        const log: WeightLog = {
          ...data,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        };
        set({ weights: [...get().weights, log] });
        get().addToQueue({ action: 'create', collection: 'Weight', id: log.id, data: log });
      },

      updateWeight: (id, updates) => {
        const updatedAt = new Date().toISOString();
        set({
          weights: get().weights.map((w) =>
            w.id === id ? { ...w, ...updates, updatedAt } : w
          ),
        });
        get().addToQueue({ action: 'update', collection: 'Weight', id, data: { ...updates, updatedAt } });
      },

      deleteWeight: (id) => {
        set({ weights: get().weights.filter((w) => w.id !== id) });
        get().addToQueue({ action: 'delete', collection: 'Weight', id });
      },

      addCategory: (name, icon) => {
        const cat: Category = { id: generateId(), name, icon };
        set({ categories: [...get().categories, cat] });
      },

      updateSettings: (updates) => {
        set({ settings: { ...get().settings, ...updates } });
      },

      addToQueue: (record) => {
        set({ syncQueue: [...get().syncQueue, record] });
      },

      clearQueue: () => set({ syncQueue: [] }),

      resetAll: () =>
        set({
          tasks: [],
          transactions: [],
          weights: [],
          categories: DEFAULT_CATEGORIES,
          syncQueue: [],
        }),
    }),
    {
      name: 'langkahkecil-store',
      partialize: (state) => ({
        tasks: state.tasks,
        transactions: state.transactions,
        weights: state.weights,
        categories: state.categories,
        settings: state.settings,
        syncQueue: state.syncQueue,
      }),
    }
  )
);

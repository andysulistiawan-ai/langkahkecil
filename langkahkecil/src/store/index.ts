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
        const tasks = get().tasks;
        const now = new Date().toISOString();
        const task: Task = {
          id: generateId(),
          name,
          color,
          order: tasks.length,
          done: false,
          createdAt: now,
          updatedAt: now,
        };
        set({ tasks: [...tasks, task] });
      },

      updateTask: (id, updates) => {
        set({
          tasks: get().tasks.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        });
      },

      deleteTask: (id) => {
        set({ tasks: get().tasks.filter((t) => t.id !== id) });
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
      },

      updateTransaction: (id, updates) => {
        set({
          transactions: get().transactions.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        });
      },

      deleteTransaction: (id) => {
        set({ transactions: get().transactions.filter((t) => t.id !== id) });
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
      },

      updateWeight: (id, updates) => {
        set({
          weights: get().weights.map((w) =>
            w.id === id ? { ...w, ...updates, updatedAt: new Date().toISOString() } : w
          ),
        });
      },

      deleteWeight: (id) => {
        set({ weights: get().weights.filter((w) => w.id !== id) });
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

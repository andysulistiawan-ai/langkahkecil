export type TaskColor = 'blue' | 'coral' | 'mint' | 'yellow' | 'purple' | 'gray';

export interface Task {
  id: string;
  name: string;
  color: TaskColor;
  order: number;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  note?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeightLog {
  id: string;
  weight: number;
  foodNotes?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export type Theme = 'light' | 'dark';
export type Language = 'id' | 'en';

export interface UserSettings {
  theme: Theme;
  language: Language;
  appScriptUrl?: string;
  lastSyncAt?: string;
  offlineMode: boolean;
}

export type SyncAction = 'create' | 'update' | 'delete';

export interface SyncRecord {
  action: SyncAction;
  collection: 'tasks' | 'transactions' | 'weights' | 'categories';
  id?: string;
  data?: any;
}

export type Tab = 'tasks' | 'finance' | 'weight' | 'settings';

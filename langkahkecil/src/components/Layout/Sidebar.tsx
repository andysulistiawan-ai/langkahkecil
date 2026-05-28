import { useStore } from '@/store';
import { ListTodo, Wallet, Weight, Settings, Sun, Moon, Globe } from 'lucide-react';
import type { Tab } from '@/types';

interface SidebarProps {
  onToggleTheme: () => void;
  onToggleLang: () => void;
}

export function Sidebar({ onToggleTheme, onToggleLang }: SidebarProps) {
  const activeTab = useStore((s) => s.activeTab);
  const setActiveTab = useStore((s) => s.setActiveTab);
  const settings = useStore((s) => s.settings);
  const tasks = useStore((s) => s.tasks);
  const activeTasks = tasks.filter((t) => !t.done).length;

  const items: { id: Tab; icon: typeof ListTodo; labelId: string; labelEn: string }[] = [
    { id: 'tasks', icon: ListTodo, labelId: 'Tugas', labelEn: 'Tasks' },
    { id: 'finance', icon: Wallet, labelId: 'Keuangan', labelEn: 'Finance' },
    { id: 'weight', icon: Weight, labelId: 'Berat Badan', labelEn: 'Weight' },
    { id: 'settings', icon: Settings, labelId: 'Pengaturan', labelEn: 'Settings' },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[240px] bg-[var(--color-bg-card)] border-r border-[var(--color-border)] flex-col z-30">
      <div className="h-14 flex items-center px-4 border-b border-[var(--color-border)]">
        <h1 className="text-lg font-bold text-primary-500">👣 langkahkecil</h1>
        <span className="ml-2 text-[10px] text-[var(--color-text-tertiary)] bg-primary-50 dark:bg-primary-900/30 px-1.5 py-0.5 rounded-full">
          {activeTasks} {settings.language === 'id' ? 'aktif' : 'active'}
        </span>
      </div>
      <nav className="flex-1 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 h-12 px-4 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500 border-l-4 border-primary-500'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)]'
              }`}
            >
              <Icon size={22} />
              <span>{settings.language === 'id' ? item.labelId : item.labelEn}</span>
            </button>
          );
        })}
      </nav>
      <div className="border-t border-[var(--color-border)] p-3 flex items-center justify-center gap-2">
        <button onClick={onToggleTheme} className="w-10 h-10 flex items-center justify-center rounded-sm hover:bg-[var(--color-border)] transition-colors" aria-label="Toggle theme">
          {settings.theme === 'dark' ? <Sun size={20} className="text-[var(--color-text-secondary)]" /> : <Moon size={20} className="text-[var(--color-text-secondary)]" />}
        </button>
        <button onClick={onToggleLang} className="w-10 h-10 flex items-center justify-center rounded-sm hover:bg-[var(--color-border)] transition-colors">
          <Globe size={20} className="text-[var(--color-text-secondary)]" />
          <span className="text-xs font-bold text-[var(--color-text-secondary)] ml-0.5">{settings.language.toUpperCase()}</span>
        </button>
      </div>
    </aside>
  );
}

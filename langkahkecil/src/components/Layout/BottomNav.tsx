import { useStore } from '@/store';
import { ListTodo, Wallet, Weight, Settings } from 'lucide-react';
import type { Tab } from '@/types';

export function BottomNav() {
  const activeTab = useStore((s) => s.activeTab);
  const setActiveTab = useStore((s) => s.setActiveTab);
  const lang = useStore((s) => s.settings.language);

  const items: { id: Tab; icon: typeof ListTodo; labelId: string; labelEn: string }[] = [
    { id: 'tasks', icon: ListTodo, labelId: 'Tugas', labelEn: 'Tasks' },
    { id: 'finance', icon: Wallet, labelId: 'Keuangan', labelEn: 'Finance' },
    { id: 'weight', icon: Weight, labelId: 'Berat', labelEn: 'Weight' },
    { id: 'settings', icon: Settings, labelId: 'Pengaturan', labelEn: 'Settings' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-fit min-w-[280px] bg-[var(--color-bg-card)] rounded-xl shadow-lg border border-[var(--color-border)] px-3 py-2">
      <div className="flex items-center justify-center gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-md transition-all min-w-[56px] ${
                isActive ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500' : 'text-[var(--color-text-tertiary)]'
              }`}
            >
              <Icon size={22} />
              <span className="text-[10px] font-semibold">{lang === 'id' ? item.labelId : item.labelEn}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

import { useStore } from '@/store';
import { Sun, Moon, Globe } from 'lucide-react';

interface HeaderProps {
  onToggleTheme: () => void;
  onToggleLang: () => void;
}

export function Header({ onToggleTheme, onToggleLang }: HeaderProps) {
  const settings = useStore((s) => s.settings);
  const tasks = useStore((s) => s.tasks);
  const t = useStore((s) => s.settings.language === 'id' ? idTexts : enTexts);
  const activeTasks = tasks.filter((t) => !t.done).length;

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold text-primary-500">👣 langkahkecil</h1>
        <span className="text-xs text-[var(--color-text-tertiary)] bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-full">
          {activeTasks} {t.tasks_active}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={onToggleLang} className="w-10 h-10 flex items-center justify-center rounded-sm hover:bg-[var(--color-border)] transition-colors" aria-label="Toggle language">
          <Globe size={20} className="text-[var(--color-text-secondary)]" />
          <span className="text-xs font-bold text-[var(--color-text-secondary)] ml-0.5">{settings.language.toUpperCase()}</span>
        </button>
        <button onClick={onToggleTheme} className="w-10 h-10 flex items-center justify-center rounded-sm hover:bg-[var(--color-border)] transition-colors" aria-label="Toggle theme">
          {settings.theme === 'dark' ? <Sun size={20} className="text-[var(--color-text-secondary)]" /> : <Moon size={20} className="text-[var(--color-text-secondary)]" />}
        </button>
      </div>
    </header>
  );
}

const idTexts = { tasks_active: 'tugas aktif' };
const enTexts = { tasks_active: 'active tasks' };

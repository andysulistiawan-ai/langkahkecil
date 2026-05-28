import { useStore } from '@/store';
import { formatDate } from '@/utils/formatters';
import { Trash2, Edit3 } from 'lucide-react';
import { WeightLog } from '@/types';

interface WeightCardProps {
  log: WeightLog;
  onEdit: (log: WeightLog) => void;
}

export function WeightCard({ log, onEdit }: WeightCardProps) {
  const deleteWeight = useStore((s) => s.deleteWeight);

  return (
    <div className="flex items-center gap-3 p-3 rounded-sm bg-[var(--color-bg-card)] border border-[var(--color-border)] group">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 bg-primary-50 dark:bg-primary-900/30 text-primary-500 font-bold">
        {log.weight}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--color-text)]">{log.weight} kg</p>
        <p className="text-[11px] text-[var(--color-text-tertiary)]">{formatDate(log.date)}</p>
        {log.foodNotes && (
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 truncate">{log.foodNotes}</p>
        )}
      </div>
      <button
        onClick={() => onEdit(log)}
        className="opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100 p-1 rounded-sm text-[var(--color-text-tertiary)] hover:text-primary-500 transition-all"
      >
        <Edit3 size={16} />
      </button>
      <button
        onClick={() => deleteWeight(log.id)}
        className="opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100 p-1 rounded-sm text-[var(--color-text-tertiary)] hover:text-red-500 transition-all"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

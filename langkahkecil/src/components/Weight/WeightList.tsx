import { useState } from 'react';
import { useStore } from '@/store';
import { WeightCard } from './WeightCard';
import { EditWeightModal } from './EditWeightModal';
import { Weight } from 'lucide-react';
import { WeightLog } from '@/types';

export function WeightList() {
  const weights = useStore((s) => s.weights);
  const lang = useStore((s) => s.settings.language);
  const sorted = [...weights].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const [editingLog, setEditingLog] = useState<WeightLog | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = (log: WeightLog) => {
    setEditingLog(log);
    setShowEdit(true);
  };

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-3">
          <Weight size={40} className="text-primary-300" />
        </div>
        <h3 className="text-base font-bold text-[var(--color-text)]">
          {lang === 'id' ? 'Belum ada data berat badan' : 'No weight data yet'}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {lang === 'id' ? 'Catat berat badanmu hari ini!' : 'Log your weight today!'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {sorted.map((log) => (
          <WeightCard key={log.id} log={log} onEdit={handleEdit} />
        ))}
      </div>
      <EditWeightModal
        isOpen={showEdit}
        onClose={() => { setShowEdit(false); setEditingLog(null); }}
        log={editingLog}
      />
    </>
  );
}

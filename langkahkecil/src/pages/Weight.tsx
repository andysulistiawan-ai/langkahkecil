import { useState } from 'react';
import { useStore } from '@/store';
import { CurrentWeight } from '@/components/Weight/CurrentWeight';
import { WeightTrendChart } from '@/components/Weight/TrendChart';
import { WeightList } from '@/components/Weight/WeightList';
import { AddWeightModal } from '@/components/Weight/AddWeightModal';
import { Plus } from 'lucide-react';

export function WeightPage() {
  const lang = useStore((s) => s.settings.language);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
        {lang === 'id' ? 'Berat Badan' : 'Weight'}
      </h2>

      <div className="flex flex-col gap-4">
        <CurrentWeight />
        <WeightTrendChart />
        <WeightList />
      </div>

      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 hover:scale-105 active:scale-95 transition-all z-30 flex items-center justify-center"
      >
        <Plus size={28} />
      </button>

      <AddWeightModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
}

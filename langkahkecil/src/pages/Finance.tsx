import { useState } from 'react';
import { useStore } from '@/store';
import { SummaryCards } from '@/components/Finance/SummaryCards';
import { TrendChart } from '@/components/Finance/TrendChart';
import { FilterChips } from '@/components/Finance/FilterChips';
import { TransactionList } from '@/components/Finance/TransactionList';
import { AddTransactionModal } from '@/components/Finance/AddTransactionModal';
import { Plus } from 'lucide-react';
import { TransactionType } from '@/types';

export function FinancePage() {
  const lang = useStore((s) => s.settings.language);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState<'all' | TransactionType>('all');
  const transactions = useStore((s) => s.transactions);

  const filtered = filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
        {lang === 'id' ? 'Keuangan' : 'Finance'}
      </h2>

      <div className="flex flex-col gap-4">
        <SummaryCards />
        <TrendChart filter={filter} />
        <FilterChips selected={filter} onChange={setFilter} />
        <TransactionList transactions={filtered} />
      </div>

      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 hover:scale-105 active:scale-95 transition-all z-30 flex items-center justify-center"
      >
        <Plus size={28} />
      </button>

      <AddTransactionModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
}

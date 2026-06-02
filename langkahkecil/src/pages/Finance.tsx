import { useState, useMemo } from 'react';
import { useStore } from '@/store';
import { SummaryCards } from '@/components/Finance/SummaryCards';
import { TrendChart } from '@/components/Finance/TrendChart';
import { CategoryPanel } from '@/components/Finance/CategoryPanel';
import { CategoryFilterDropdown } from '@/components/Finance/CategoryFilterDropdown';
import { FilterChips } from '@/components/Finance/FilterChips';
import { TransactionList } from '@/components/Finance/TransactionList';
import { AddTransactionModal } from '@/components/Finance/AddTransactionModal';
import { Plus } from 'lucide-react';
import { TransactionType } from '@/types';
import { getToday } from '@/utils/formatters';

export function FinancePage() {
  const lang = useStore((s) => s.settings.language);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState<'all' | TransactionType>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const transactions = useStore((s) => s.transactions);
  const today = getToday();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const [startDate, setStartDate] = useState(sevenDaysAgo.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today);

  const filtered = filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);

  const categoryFiltered = useMemo(
    () => selectedCategories.length === 0
      ? filtered
      : filtered.filter((t) => selectedCategories.includes(t.category)),
    [filtered, selectedCategories]
  );

  const dateFiltered = useMemo(
    () => categoryFiltered.filter((t) => {
      const day = t.date.split('T')[0];
      return day >= startDate && day <= endDate;
    }),
    [categoryFiltered, startDate, endDate]
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
        {lang === 'id' ? 'Keuangan' : 'Finance'}
      </h2>

      <div className="flex flex-col gap-4">
        <SummaryCards />
        <TrendChart
          filter={filter}
          categoryFilter={selectedCategories}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <CategoryPanel
          transactions={transactions}
          startDate={startDate}
          endDate={endDate}
        />
        <div className="flex items-center gap-2 flex-wrap">
          <FilterChips selected={filter} onChange={setFilter} />
          <CategoryFilterDropdown selected={selectedCategories} onChange={setSelectedCategories} />
        </div>
        <TransactionList transactions={dateFiltered} />
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

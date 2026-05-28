import { useStore } from '@/store';
import { formatCurrency } from '@/utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function SummaryCards() {
  const transactions = useStore((s) => s.transactions);
  const lang = useStore((s) => s.settings.language);
  const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-md p-4 bg-gradient-to-br from-secondary-mint/20 to-secondary-mint/5 border border-secondary-mint/30">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={16} className="text-green-600" />
          <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
            {lang === 'id' ? 'Total Pemasukan' : 'Total Income'}
          </span>
        </div>
        <p className="text-xl font-bold text-green-700 dark:text-green-400">{formatCurrency(income)}</p>
      </div>
      <div className="rounded-md p-4 bg-gradient-to-br from-secondary-coral/20 to-secondary-coral/5 border border-secondary-coral/30">
        <div className="flex items-center gap-2 mb-1">
          <TrendingDown size={16} className="text-red-500" />
          <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
            {lang === 'id' ? 'Total Pengeluaran' : 'Total Expense'}
          </span>
        </div>
        <p className="text-xl font-bold text-red-600 dark:text-red-400">{formatCurrency(expense)}</p>
      </div>
    </div>
  );
}

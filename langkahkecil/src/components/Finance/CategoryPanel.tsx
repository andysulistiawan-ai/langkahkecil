import { useState, useMemo } from 'react';
import { useStore } from '@/store';
import { formatCurrency } from '@/utils/formatters';
import { Transaction } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryPanelProps {
  transactions: Transaction[];
  startDate: string;
  endDate: string;
}

export function CategoryPanel({ transactions, startDate, endDate }: CategoryPanelProps) {
  const lang = useStore((s) => s.settings.language);
  const categories = useStore((s) => s.categories);
  const [page, setPage] = useState(0);
  const perPage = 4;

  const expenseByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    transactions.forEach((t) => {
      if (t.type !== 'expense') return;
      const d = new Date(t.date);
      if (d >= start && d <= end) {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });

    return Object.entries(map)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions, startDate, endDate]);

  const totalExpense = expenseByCategory.reduce((s, c) => s + c.amount, 0);
  const totalPages = Math.max(1, Math.ceil(expenseByCategory.length / perPage));
  const visible = expenseByCategory.slice(page * perPage, page * perPage + perPage);

  if (expenseByCategory.length === 0) return null;

  const allCats = [...categories];
  const getIcon = (name: string) => allCats.find((c) => c.name === name)?.icon;

  return (
    <div className="rounded-md p-4 bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3">
        {lang === 'id' ? 'Pengeluaran per Kategori' : 'Expenses by Category'}
      </h3>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-primary-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2">
          {visible.map((cat) => {
            const pct = totalExpense > 0 ? (cat.amount / totalExpense) * 100 : 0;
            return (
              <div
                key={cat.name}
                className="flex flex-col items-center gap-1 p-3 rounded-sm bg-[var(--color-bg)] border border-[var(--color-border-light)]"
              >
                <span className="text-xl">{getIcon(cat.name) || '📦'}</span>
                <span className="text-xs font-semibold text-[var(--color-text)] text-center leading-tight">
                  {cat.name}
                </span>
                <span className="text-sm font-bold text-red-500">
                  {formatCurrency(cat.amount)}
                </span>
                <span className="text-[10px] text-[var(--color-text-tertiary)]">
                  ({pct.toFixed(1)}%)
                </span>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
          disabled={page >= totalPages - 1}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-primary-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

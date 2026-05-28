import { useStore } from '@/store';
import { formatCurrency, formatDate, formatTime } from '@/utils/formatters';
import { Trash2, Edit3 } from 'lucide-react';
import { Transaction } from '@/types';
import { DEFAULT_CATEGORIES } from '@/utils/constants';

interface TransactionCardProps {
  transaction: Transaction;
  onEdit: (tx: Transaction) => void;
}

export function TransactionCard({ transaction, onEdit }: TransactionCardProps) {
  const deleteTransaction = useStore((s) => s.deleteTransaction);
  const categories = useStore((s) => s.categories);
  const allCats = [...DEFAULT_CATEGORIES, ...categories].filter((cat, i, arr) => arr.findIndex(c => c.name === cat.name) === i);
  const cat = allCats.find((c) => c.name === transaction.category);

  return (
    <div className="flex items-center gap-3 p-3 rounded-sm bg-[var(--color-bg-card)] border border-[var(--color-border)] group">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 bg-[var(--color-border-light)]">
        {cat?.icon || '📦'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-border-light)] text-[var(--color-text-secondary)]">
            {transaction.category}
          </span>
        </div>
        {transaction.note && (
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 truncate">{transaction.note}</p>
        )}
        <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
          {formatDate(transaction.date)} · {formatTime(transaction.createdAt)}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className={`text-sm font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </p>
      </div>
      <button
        onClick={() => onEdit(transaction)}
        className="p-1 rounded-sm text-[var(--color-text-tertiary)] hover:text-primary-500 transition-all"
      >
        <Edit3 size={16} />
      </button>
      <button
        onClick={() => deleteTransaction(transaction.id)}
        className="p-1 rounded-sm text-[var(--color-text-tertiary)] hover:text-red-500 transition-all"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

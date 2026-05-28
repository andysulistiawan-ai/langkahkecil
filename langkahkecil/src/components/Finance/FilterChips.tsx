import { useStore } from '@/store';
import { TransactionType } from '@/types';

interface FilterChipsProps {
  selected: 'all' | TransactionType;
  onChange: (value: 'all' | TransactionType) => void;
}

export function FilterChips({ selected, onChange }: FilterChipsProps) {
  const lang = useStore((s) => s.settings.language);
  const isId = lang === 'id';
  const filters: { value: 'all' | TransactionType; labelId: string; labelEn: string }[] = [
    { value: 'all', labelId: 'Semua', labelEn: 'All' },
    { value: 'income', labelId: 'Pemasukan', labelEn: 'Income' },
    { value: 'expense', labelId: 'Pengeluaran', labelEn: 'Expense' },
  ];

  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full border-2 transition-all ${
            selected === f.value
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-primary-300'
          }`}
        >
          {f.labelId}
        </button>
      ))}
    </div>
  );
}

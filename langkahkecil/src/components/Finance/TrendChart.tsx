import { useStore } from '@/store';
import { formatDateShort, formatCurrency } from '@/utils/formatters';
import { TransactionType } from '@/types';

interface TrendChartProps {
  filter: 'all' | TransactionType;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export function TrendChart({ filter, startDate, endDate, onStartDateChange, onEndDateChange }: TrendChartProps) {
  const transactions = useStore((s) => s.transactions);
  const lang = useStore((s) => s.settings.language);

  const filtered = filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);

  const dailyData: Record<string, { income: number; expense: number }> = {};
  const d = new Date(startDate);
  while (d <= new Date(endDate)) {
    const key = d.toISOString().split('T')[0];
    dailyData[key] = { income: 0, expense: 0 };
    d.setDate(d.getDate() + 1);
  }

  filtered.forEach((t) => {
    const day = t.date.split('T')[0];
    if (dailyData[day]) {
      if (t.type === 'income') dailyData[day].income += t.amount;
      else dailyData[day].expense += t.amount;
    }
  });

  const chartData = Object.entries(dailyData).map(([date, data]) => ({
    date: formatDateShort(date),
    income: data.income,
    expense: data.expense,
    net: data.income - data.expense,
  }));

  const maxVal = Math.max(...chartData.flatMap((d) => [d.income, d.expense]), 1);

  const formatNet = (net: number) => {
    if (net > 0) return `+${formatCurrency(net)}`;
    if (net < 0) return `-${formatCurrency(Math.abs(net))}`;
    return '';
  };

  return (
    <div className="rounded-md p-4 bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[var(--color-text)]">
          {lang === 'id' ? 'Grafik Keuangan' : 'Finance Chart'}
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="h-8 px-2 text-[11px] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] focus:outline-none focus:border-primary-500"
          />
          <span className="text-[11px] text-[var(--color-text-tertiary)]">-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="h-8 px-2 text-[11px] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>
      <div className="flex items-end gap-1.5 h-[200px]">
        {chartData.map((d, i) => {
          const netLabel = formatNet(d.net);
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5 h-full">
              {netLabel && (
                <span className={`text-[9px] font-bold whitespace-nowrap ${d.net >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {netLabel}
                </span>
              )}
              <div
                className="w-full bg-secondary-mint rounded-t-xs transition-all duration-300"
                style={{ height: `${(d.income / maxVal) * 100}%`, minHeight: d.income > 0 ? '4px' : '0' }}
                title={`Income: ${d.income}`}
              />
              <div
                className="w-full bg-secondary-coral rounded-t-xs transition-all duration-300"
                style={{ height: `${(d.expense / maxVal) * 100}%`, minHeight: d.expense > 0 ? '4px' : '0' }}
                title={`Expense: ${d.expense}`}
              />
              <span className="text-[9px] text-[var(--color-text-tertiary)] mt-1">{d.date.slice(0, 3)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

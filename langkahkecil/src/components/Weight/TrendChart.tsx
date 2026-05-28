import { useState } from 'react';
import { useStore } from '@/store';
import { formatDate } from '@/utils/formatters';
import { getToday } from '@/utils/formatters';

export function WeightTrendChart() {
  const weights = useStore((s) => s.weights);
  const lang = useStore((s) => s.settings.language);
  const today = getToday();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const [startDate, setStartDate] = useState(thirtyDaysAgo.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today);

  const filtered = weights
    .filter((w) => w.date >= startDate && w.date <= endDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (filtered.length < 2) {
    return (
      <div className="rounded-md p-4 bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">
            {lang === 'id' ? 'Tren Berat Badan' : 'Weight Trend'}
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-8 px-2 text-[11px] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] focus:outline-none focus:border-primary-500"
            />
            <span className="text-[11px] text-[var(--color-text-tertiary)]">-</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-8 px-2 text-[11px] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] text-center py-8">
          {lang === 'id' ? 'Butuh minimal 2 data untuk grafik' : 'Need at least 2 data points for chart'}
        </p>
      </div>
    );
  }

  const minW = Math.min(...filtered.map((w) => w.weight)) - 2;
  const maxW = Math.max(...filtered.map((w) => w.weight)) + 2;
  const rangeW = maxW - minW || 1;

  return (
    <div className="rounded-md p-4 bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[var(--color-text)]">
          {lang === 'id' ? 'Tren Berat Badan' : 'Weight Trend'}
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-8 px-2 text-[11px] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] focus:outline-none focus:border-primary-500"
          />
          <span className="text-[11px] text-[var(--color-text-tertiary)]">-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-8 px-2 text-[11px] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>
      <div className="relative h-[180px]">
        <svg viewBox={`0 0 ${filtered.length * 40} 180`} className="w-full h-full overflow-visible">
          <line x1="0" y1="170" x2={filtered.length * 40} y2="170" stroke="var(--color-border)" strokeWidth="1" />
          {filtered.map((w, i) => {
            const x = i * 40 + 20;
            const y = 170 - ((w.weight - minW) / rangeW) * 150;
            return (
              <g key={w.id}>
                {i > 0 && (
                  <line
                    x1={(i - 1) * 40 + 20}
                    y1={170 - ((filtered[i - 1].weight - minW) / rangeW) * 150}
                    x2={x}
                    y2={y}
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
                <circle cx={x} cy={y} r="4" fill="#3B82F6" className="cursor-pointer hover:r-6" />
                <text x={x} y="185" textAnchor="middle" className="fill-[var(--color-text-tertiary)]" fontSize="9">
                  {formatDate(w.date).slice(0, 5)}
                </text>
                <text x={x} y={y - 8} textAnchor="middle" className="fill-[var(--color-text)]" fontSize="9" fontWeight="600">
                  {w.weight}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

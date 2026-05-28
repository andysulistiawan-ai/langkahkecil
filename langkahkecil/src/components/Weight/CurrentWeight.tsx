import { useStore } from '@/store';
import { formatDate } from '@/utils/formatters';
import { calculateBMI } from '@/utils/formatters';
import { useState } from 'react';

export function CurrentWeight() {
  const weights = useStore((s) => s.weights);
  const lang = useStore((s) => s.settings.language);
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<{ score: number; status: string; statusText: string } | null>(null);

  const sorted = [...weights].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latest = sorted[0];
  const [bmiWeight, setBmiWeight] = useState(latest?.weight?.toString() || '');

  const handleCalculate = () => {
    if (height && bmiWeight) {
      setBmiResult(calculateBMI(Number(height), Number(bmiWeight)));
    }
  };

  const statusConfig = {
    underweight: { color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-900/30', icon: '🤔' },
    normal: { color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/30', icon: '🎉' },
    overweight: { color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/30', icon: '😅' },
    obese: { color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/30', icon: '😰' },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {latest && (
        <div className="rounded-md p-4 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 border border-primary-200 dark:border-primary-800">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1">
            {lang === 'id' ? 'Berat Saat Ini' : 'Current Weight'}
          </p>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{latest.weight} <span className="text-lg">kg</span></p>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-1">{formatDate(latest.date)}</p>
        </div>
      )}

      <div className="rounded-md p-4 bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        <h4 className="text-sm font-bold text-[var(--color-text)] mb-3">
          {lang === 'id' ? 'Kalkulator BMI' : 'BMI Calculator'}
        </h4>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={lang === 'id' ? 'Tinggi (cm)' : 'Height (cm)'}
            className="flex-1 h-10 px-3 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] focus:outline-none focus:border-primary-500"
          />
          <input
            type="number"
            value={bmiWeight}
            onChange={(e) => setBmiWeight(e.target.value)}
            placeholder={lang === 'id' ? 'Berat (kg)' : 'Weight (kg)'}
            className="flex-1 h-10 px-3 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] focus:outline-none focus:border-primary-500"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="w-full h-10 rounded-sm bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors"
        >
          {lang === 'id' ? 'Hitung BMI' : 'Calculate BMI'}
        </button>
        {bmiResult && (
          <div className={`mt-3 p-3 rounded-sm ${statusConfig[bmiResult.status as keyof typeof statusConfig].bg}`}>
            <p className="text-xs text-[var(--color-text-secondary)]">{lang === 'id' ? 'Skor BMI' : 'BMI Score'}</p>
            <p className={`text-2xl font-bold ${statusConfig[bmiResult.status as keyof typeof statusConfig].color}`}>
              {bmiResult.score}
            </p>
            <p className="text-sm font-semibold text-[var(--color-text)]">
              {statusConfig[bmiResult.status as keyof typeof statusConfig].icon} {bmiResult.statusText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

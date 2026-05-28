import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import { Modal } from '@/components/Common/Modal';
import { Button } from '@/components/Common/Button';
import { Input } from '@/components/Common/Input';
import { WeightLog } from '@/types';

interface EditWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: WeightLog | null;
}

export function EditWeightModal({ isOpen, onClose, log }: EditWeightModalProps) {
  const updateWeight = useStore((s) => s.updateWeight);
  const lang = useStore((s) => s.settings.language);
  const [weight, setWeight] = useState('');
  const [foodNotes, setFoodNotes] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (log) {
      setWeight(log.weight.toString());
      setFoodNotes(log.foodNotes || '');
      setDate(log.date.split('T')[0] || '');
      setError('');
    }
  }, [log]);

  const handleSubmit = () => {
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
      setError(lang === 'id' ? 'Berat harus diisi' : 'Weight is required');
      return;
    }
    if (log) {
      updateWeight(log.id, {
        weight: Math.round(Number(weight) * 100) / 100,
        foodNotes: foodNotes.trim() || undefined,
        date,
      });
    }
    onClose();
  };

  if (!log) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={lang === 'id' ? 'Edit Berat Badan' : 'Edit Weight'}>
      <div className="flex flex-col gap-4">
        <Input
          label={`${lang === 'id' ? 'Berat Badan' : 'Weight'} (kg)`}
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => { setWeight(e.target.value); setError(''); }}
          placeholder="65.5"
          error={error}
        />

        <Input
          label={lang === 'id' ? 'Tanggal' : 'Date'}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[var(--color-text)]">
            {lang === 'id' ? 'Catatan Makanan' : 'Food Notes'}
          </label>
          <textarea
            value={foodNotes}
            onChange={(e) => setFoodNotes(e.target.value)}
            placeholder={lang === 'id' ? 'Apa yang kamu makan hari ini?' : 'What did you eat today?'}
            className="w-full min-h-[80px] p-3 text-sm bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] resize-y focus:outline-none focus:border-primary-500"
          />
        </div>

        <div className="flex gap-3 justify-end mt-2">
          <Button variant="secondary" onClick={onClose}>
            {lang === 'id' ? 'Batal' : 'Cancel'}
          </Button>
          <Button onClick={handleSubmit}>
            {lang === 'id' ? 'Simpan' : 'Save'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

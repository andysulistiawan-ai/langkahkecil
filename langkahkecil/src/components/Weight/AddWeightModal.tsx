import { useState } from 'react';
import { useStore } from '@/store';
import { Modal } from '@/components/Common/Modal';
import { Button } from '@/components/Common/Button';
import { Input } from '@/components/Common/Input';
import { getToday } from '@/utils/formatters';

interface AddWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddWeightModal({ isOpen, onClose }: AddWeightModalProps) {
  const addWeight = useStore((s) => s.addWeight);
  const lang = useStore((s) => s.settings.language);
  const [weight, setWeight] = useState('');
  const [foodNotes, setFoodNotes] = useState('');
  const [date, setDate] = useState(getToday());
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
      setError(lang === 'id' ? 'Berat harus diisi' : 'Weight is required');
      return;
    }
    addWeight({
      weight: Math.round(Number(weight) * 100) / 100,
      foodNotes: foodNotes.trim() || undefined,
      date,
    });
    setWeight('');
    setFoodNotes('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={lang === 'id' ? 'Tambah Berat Badan' : 'Add Weight'}>
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
            {lang === 'id' ? 'Catatan Makanan' : 'Food Notes'} <span className="text-[var(--color-text-tertiary)]">({lang === 'id' ? 'opsional' : 'optional'})</span>
          </label>
          <textarea
            value={foodNotes}
            onChange={(e) => setFoodNotes(e.target.value)}
            placeholder={lang === 'id' ? 'Apa yang kamu makan hari ini?' : 'What did you eat today?'}
            className="w-full min-h-[80px] p-3 text-sm bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] resize-y focus:outline-none focus:border-primary-500"
          />
          <p className="text-[11px] text-[var(--color-text-tertiary)]">
            {lang === 'id' ? 'Contoh: Nasi goreng (siang), Salad (malam)' : 'Example: Fried rice (lunch), Salad (dinner)'}
          </p>
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

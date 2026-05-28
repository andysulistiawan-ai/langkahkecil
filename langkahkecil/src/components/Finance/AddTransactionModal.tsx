import { useState } from 'react';
import { useStore } from '@/store';
import { Modal } from '@/components/Common/Modal';
import { Button } from '@/components/Common/Button';
import { Input } from '@/components/Common/Input';
import { DEFAULT_CATEGORIES } from '@/utils/constants';
import { getToday } from '@/utils/formatters';
import { TransactionType } from '@/types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const addTransaction = useStore((s) => s.addTransaction);
  const categories = useStore((s) => s.categories);
  const addCategory = useStore((s) => s.addCategory);
  const lang = useStore((s) => s.settings.language);

  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Makanan');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(getToday());
  const [showNewCat, setShowNewCat] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const allCats = [...DEFAULT_CATEGORIES, ...categories];

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      errs.amount = lang === 'id' ? 'Jumlah harus diisi' : 'Amount is required';
    }
    if (!category) errs.category = lang === 'id' ? 'Pilih kategori' : 'Select category';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    addTransaction({
      type,
      amount: Math.round(Number(amount)),
      category,
      note: note || undefined,
      date,
    });
    setAmount('');
    setNote('');
    setErrors({});
    onClose();
  };

  const handleAddCategory = () => {
    if (newCatName.trim()) {
      addCategory(newCatName.trim(), '📌');
      setCategory(newCatName.trim());
      setNewCatName('');
      setShowNewCat(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={lang === 'id' ? 'Tambah Transaksi' : 'Add Transaction'}>
      <div className="flex flex-col gap-4">
        <div className="flex rounded-sm overflow-hidden border border-[var(--color-border)]">
          <button
            onClick={() => setType('expense')}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${type === 'expense' ? 'bg-red-500 text-white' : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)]'}`}
          >
            {lang === 'id' ? 'Pengeluaran' : 'Expense'}
          </button>
          <button
            onClick={() => setType('income')}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${type === 'income' ? 'bg-green-500 text-white' : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)]'}`}
          >
            {lang === 'id' ? 'Pemasukan' : 'Income'}
          </button>
        </div>

        <Input
          label={lang === 'id' ? 'Jumlah (Rp)' : 'Amount (Rp)'}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          error={errors.amount}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[var(--color-text)]">
            {lang === 'id' ? 'Kategori' : 'Category'}
          </label>
          <select
            value={category}
            onChange={(e) => {
              if (e.target.value === '__new__') {
                setShowNewCat(true);
              } else {
                setCategory(e.target.value);
              }
            }}
            className="w-full h-[44px] px-4 text-sm bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] focus:outline-none focus:border-primary-500"
          >
            {allCats.map((c) => (
              <option key={c.id} value={c.name}>
                {c.icon} {c.name}
              </option>
            ))}
            <option value="__new__">+ {lang === 'id' ? 'Tambah Baru' : 'Add New'}</option>
          </select>
        </div>

        {showNewCat && (
          <div className="flex gap-2 items-end">
            <Input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder={lang === 'id' ? 'Nama kategori baru' : 'New category name'}
            />
            <Button size="sm" onClick={handleAddCategory}>
              {lang === 'id' ? 'Tambah' : 'Add'}
            </Button>
          </div>
        )}

        <Input
          label={lang === 'id' ? 'Tanggal' : 'Date'}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[var(--color-text)]">
            {lang === 'id' ? 'Catatan' : 'Note'} <span className="text-[var(--color-text-tertiary)]">({lang === 'id' ? 'opsional' : 'optional'})</span>
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={lang === 'id' ? 'Tambahkan catatan...' : 'Add a note...'}
            className="w-full min-h-[60px] p-3 text-sm bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] resize-y focus:outline-none focus:border-primary-500"
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

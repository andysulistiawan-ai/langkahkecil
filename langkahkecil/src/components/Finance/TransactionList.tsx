import { useStore } from '@/store';
import { TransactionCard } from './TransactionCard';
import { Wallet } from 'lucide-react';
import { Transaction } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const updateTransaction = useStore((s) => s.updateTransaction);
  const lang = useStore((s) => s.settings.language);
  const sorted = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleEdit = (tx: Transaction) => {
    const newAmount = prompt(
      lang === 'id' ? `Edit jumlah (${tx.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}):` : `Edit amount (${tx.type}):`,
      String(tx.amount)
    );
    if (newAmount && !isNaN(Number(newAmount)) && Number(newAmount) > 0) {
      updateTransaction(tx.id, { amount: Math.round(Number(newAmount)) });
    }
  };

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 rounded-full bg-secondary-yellow/20 flex items-center justify-center mb-3">
          <Wallet size={40} className="text-secondary-yellow" />
        </div>
        <h3 className="text-base font-bold text-[var(--color-text)]">
          {lang === 'id' ? 'Belum ada transaksi' : 'No transactions yet'}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {lang === 'id' ? 'Catat pemasukan atau pengeluaran pertamamu!' : 'Record your first income or expense!'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {sorted.map((tx) => (
        <TransactionCard key={tx.id} transaction={tx} onEdit={handleEdit} />
      ))}
    </div>
  );
}

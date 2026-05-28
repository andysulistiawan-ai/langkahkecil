import { z } from 'zod';

export const taskSchema = z.object({
  name: z.string().min(1, 'Nama tugas harus diisi').max(200, 'Maksimal 200 karakter'),
  color: z.enum(['blue', 'coral', 'mint', 'yellow', 'purple', 'gray']),
});

export const transactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.number().min(1, 'Jumlah harus lebih dari 0'),
  category: z.string().min(1, 'Pilih kategori'),
  note: z.string().max(500).optional(),
  date: z.string().min(1, 'Pilih tanggal'),
});

export const weightSchema = z.object({
  weight: z.number().min(20, 'Berat minimal 20 kg').max(500, 'Berat maksimal 500 kg'),
  foodNotes: z.string().max(1000).optional(),
  date: z.string().min(1, 'Pilih tanggal'),
});

export const bmiSchema = z.object({
  height: z.number().min(50, 'Tinggi minimal 50 cm').max(300, 'Tinggi maksimal 300 cm'),
  weight: z.number().min(20, 'Berat minimal 20 kg').max(500, 'Berat maksimal 500 kg'),
});

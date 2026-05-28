export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string, locale: string = 'id'): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateShort(dateStr: string, locale: string = 'id'): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

export function formatDateInput(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function getWeekRange(): { start: string; end: string } {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay());
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] };
}

export function getMonthRange(): { start: string; end: string } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] };
}

export function calculateBMI(heightCm: number, weightKg: number): { score: number; status: string; statusText: string } {
  const heightM = heightCm / 100;
  const score = weightKg / (heightM * heightM);
  if (score < 18.5) return { score: Math.round(score * 10) / 10, status: 'underweight', statusText: 'Kurang berat badan' };
  if (score < 25) return { score: Math.round(score * 10) / 10, status: 'normal', statusText: 'Berat ideal!' };
  if (score < 30) return { score: Math.round(score * 10) / 10, status: 'overweight', statusText: 'Kelebihan berat' };
  return { score: Math.round(score * 10) / 10, status: 'obese', statusText: 'Obesitas' };
}

export function getDateRange(days: number): { start: string; end: string } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  return { start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] };
}

import { useState, useEffect, useRef } from 'react';
import { useStore } from '@/store';
import { TaskList } from '@/components/Task/TaskList';
import { AddTaskModal } from '@/components/Task/AddTaskModal';
import { Modal } from '@/components/Common/Modal';
import { Button } from '@/components/Common/Button';
import { Plus, Timer, Play, Pause, RotateCcw } from 'lucide-react';

export function TasksPage() {
  const lang = useStore((s) => s.settings.language);
  const [showAdd, setShowAdd] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('25');
  const [timerSeconds, setTimerSeconds] = useState('00');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const total = parseInt(timerHours) * 3600 + parseInt(timerMinutes) * 60 + parseInt(timerSeconds);
    if (total > 0) {
      setTimeLeft(total);
      setIsRunning(true);
    }
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const progress = 1 - timeLeft / (parseInt(timerHours) * 3600 + parseInt(timerMinutes) * 60 + parseInt(timerSeconds) || 1);

  const setPreset = (minutes: number) => {
    setTimerHours('00');
    setTimerMinutes(String(minutes));
    setTimerSeconds('00');
    setTimeLeft(minutes * 60);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">
          {lang === 'id' ? 'Daftar Tugas' : 'Task List'}
        </h2>
        <button
          onClick={() => { setShowTimer(true); setTimeLeft(25 * 60); setIsRunning(false); }}
          className="w-10 h-10 flex items-center justify-center rounded-sm text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
        >
          <Timer size={22} />
        </button>
      </div>

      <TaskList />

      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 hover:scale-105 active:scale-95 transition-all z-30 flex items-center justify-center"
      >
        <Plus size={28} />
      </button>

      <AddTaskModal isOpen={showAdd} onClose={() => setShowAdd(false)} />

      <Modal isOpen={showTimer} onClose={() => { setIsRunning(false); setShowTimer(false); if (intervalRef.current) clearInterval(intervalRef.current); }} title={lang === 'id' ? 'Fokus Timer' : 'Focus Timer'}>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="var(--color-border)" strokeWidth="8" />
              <circle
                cx="80" cy="80" r="70"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={440}
                strokeDashoffset={440 * (1 - progress)}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-[var(--color-text)]">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {[25, 45, 60].map((m) => (
              <button
                key={m}
                onClick={() => setPreset(m)}
                className="px-3 py-1.5 text-xs font-semibold rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 transition-colors"
              >
                {m === 60 ? (lang === 'id' ? '1 jam' : '1 hour') : `${m} ${lang === 'id' ? 'menit' : 'min'}`}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input type="number" value={timerHours} onChange={(e) => setTimerHours(e.target.value.padStart(2, '0'))} className="w-14 h-10 text-center text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm" min="0" max="23" />
            <span className="text-xl font-bold text-[var(--color-text)]">:</span>
            <input type="number" value={timerMinutes} onChange={(e) => setTimerMinutes(e.target.value.padStart(2, '0'))} className="w-14 h-10 text-center text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm" min="0" max="59" />
            <span className="text-xl font-bold text-[var(--color-text)]">:</span>
            <input type="number" value={timerSeconds} onChange={(e) => setTimerSeconds(e.target.value.padStart(2, '0'))} className="w-14 h-10 text-center text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm" min="0" max="59" />
          </div>

          <div className="flex gap-3">
            {!isRunning ? (
              <Button onClick={startTimer}>
                <Play size={18} className="mr-1" /> {lang === 'id' ? 'Mulai' : 'Start'}
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => setIsRunning(false)}>
                <Pause size={18} className="mr-1" /> {lang === 'id' ? 'Jeda' : 'Pause'}
              </Button>
            )}
            <Button variant="tertiary" onClick={() => { setIsRunning(false); setTimeLeft(25 * 60); setPreset(25); }}>
              <RotateCcw size={18} className="mr-1" /> {lang === 'id' ? 'Reset' : 'Reset'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

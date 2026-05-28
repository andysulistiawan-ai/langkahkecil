import { useEffect, useState, DragEvent } from 'react';
import { useStore } from '@/store';
import { TaskCard } from './TaskCard';
import { ListTodo } from 'lucide-react';
import { Task } from '@/types';

export function TaskList() {
  const tasks = useStore((s) => s.tasks);
  const updateTask = useStore((s) => s.updateTask);
  const reorderTasks = useStore((s) => s.reorderTasks);
  const lang = useStore((s) => s.settings.language);
  const [sortedTasks, setSortedTasks] = useState([...tasks].sort((a, b) => a.order - b.order));
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    setSortedTasks([...tasks].sort((a, b) => a.order - b.order));
  }, [tasks]);

  const handleEdit = (id: string, name: string) => {
    const newName = prompt(lang === 'id' ? 'Edit nama tugas:' : 'Edit task name:', name);
    if (newName && newName.trim()) {
      updateTask(id, { name: newName.trim() });
    }
  };

  const handleDragStart = (_e: DragEvent<HTMLDivElement>, task: Task) => {
    const idx = sortedTasks.findIndex((t) => t.id === task.id);
    setDragIndex(idx);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (_e: DragEvent<HTMLDivElement>, targetTask: Task) => {
    if (dragIndex === null) return;
    const newList = [...sortedTasks];
    const [moved] = newList.splice(dragIndex, 1);
    const targetIdx = newList.findIndex((t) => t.id === targetTask.id);
    newList.splice(targetIdx, 0, moved);
    const reordered = newList.map((t, i) => ({ ...t, order: i }));
    reorderTasks(reordered);
    setDragIndex(null);
  };

  if (sortedTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 mb-4 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
          <ListTodo size={48} className="text-primary-300" />
        </div>
        <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">
          {lang === 'id' ? 'Belum ada tugas' : 'No tasks yet'}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {lang === 'id' ? 'Tambahkan tugas pertamamu!' : 'Add your first task!'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {sortedTasks.map((task) => (
        <div key={task.id} className="group">
          <TaskCard
            task={task}
            onEdit={handleEdit}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        </div>
      ))}
    </div>
  );
}

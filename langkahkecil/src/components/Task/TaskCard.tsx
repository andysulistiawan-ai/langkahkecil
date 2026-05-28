import { useStore } from '@/store';
import { Checkbox } from '@/components/Common/Checkbox';
import { Trash2, Edit3, GripVertical } from 'lucide-react';
import { COLOR_MAP } from '@/utils/constants';
import { Task } from '@/types';
import { DragEvent } from 'react';

interface TaskCardProps {
  task: Task;
  onEdit: (id: string, name: string) => void;
  onDragStart: (e: DragEvent<HTMLDivElement>, task: Task) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>, task: Task) => void;
}

export function TaskCard({ task, onEdit, onDragStart, onDragOver, onDrop }: TaskCardProps) {
  const toggleTaskDone = useStore((s) => s.toggleTaskDone);
  const deleteTask = useStore((s) => s.deleteTask);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, task)}
      className={`flex items-center gap-3 p-3 rounded-sm bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 ${
        task.done ? 'opacity-50' : ''
      }`}
      style={{ borderLeft: `4px solid ${COLOR_MAP[task.color]}` }}
    >
      <div className="text-[var(--color-text-tertiary)] cursor-grab active:cursor-grabbing">
        <GripVertical size={18} />
      </div>
      <Checkbox checked={task.done} onChange={() => toggleTaskDone(task.id)} />
      <span
        className={`flex-1 text-sm cursor-pointer ${
          task.done ? 'line-through text-[var(--color-text-tertiary)]' : 'text-[var(--color-text)]'
        }`}
      >
        {task.name}
      </span>
      <button
        onClick={() => onEdit(task.id, task.name)}
        className="p-1 rounded-sm text-[var(--color-text-tertiary)] hover:text-primary-500 transition-all"
      >
        <Edit3 size={16} />
      </button>
      <button
        onClick={() => deleteTask(task.id)}
        className="p-1 rounded-sm text-[var(--color-text-tertiary)] hover:text-red-500 transition-all"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

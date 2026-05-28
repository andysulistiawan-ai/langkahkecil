import { TaskColor } from '@/types';
import { TASK_COLORS, COLOR_MAP } from '@/utils/constants';

interface ColorPickerProps {
  selected: TaskColor;
  onChange: (color: TaskColor) => void;
}

export function ColorPicker({ selected, onChange }: ColorPickerProps) {
  return (
    <div className="flex gap-3">
      {TASK_COLORS.map((color) => (
        <button
          key={color}
          onClick={() => onChange(color as TaskColor)}
          className={`w-10 h-10 rounded-full transition-all duration-200 ${
            selected === color
              ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-dark-slate-800 scale-110'
              : 'ring-1 ring-[var(--color-border)]'
          }`}
          style={{ backgroundColor: COLOR_MAP[color] }}
          aria-label={color}
        />
      ))}
    </div>
  );
}

import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
}

export function Checkbox({ checked, onChange, className = '' }: CheckboxProps) {
  return (
    <button
      onClick={onChange}
      className={`w-5 h-5 rounded-xs border-2 flex items-center justify-center transition-all duration-300 ${
        checked
          ? 'bg-primary-500 border-primary-500 scale-100'
          : 'border-primary-500 bg-transparent hover:bg-primary-50'
      } ${className}`}
    >
      {checked && <Check size={14} className="text-white animate-bounce-sm" strokeWidth={3} />}
    </button>
  );
}

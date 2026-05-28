import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, prefix, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold text-[var(--color-text)]">{label}</label>}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] text-sm font-mono">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          className={`w-full h-[44px] px-4 py-3 text-sm bg-[var(--color-bg-card)] border rounded-sm border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] transition-all duration-150 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
            prefix ? 'pl-10' : ''
          } ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

interface IconButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function IconButton({ onClick, children, className = '', label }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 flex items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] hover:text-[var(--color-text)] transition-colors ${className}`}
      aria-label={label}
    >
      {children}
    </button>
  );
}

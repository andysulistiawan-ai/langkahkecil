import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  accent?: 'blue' | 'coral' | 'mint' | 'yellow' | 'purple' | 'none';
  onClick?: () => void;
}

export function Card({ children, className = '', accent = 'none', onClick }: CardProps) {
  const accentMap = {
    blue: 'border-l-4 border-l-primary-500',
    coral: 'border-l-4 border-l-secondary-coral',
    mint: 'border-l-4 border-l-secondary-mint',
    yellow: 'border-l-4 border-l-secondary-yellow',
    purple: 'border-l-4 border-l-secondary-purple',
    none: '',
  };

  return (
    <div
      className={`bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-md p-4 shadow-soft transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : ''
      } ${accentMap[accent]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

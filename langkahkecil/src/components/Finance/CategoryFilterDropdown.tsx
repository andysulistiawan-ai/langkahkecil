import { useState, useRef, useEffect, useMemo } from 'react';
import { useStore } from '@/store';
import { DEFAULT_CATEGORIES } from '@/utils/constants';
import { ChevronDown } from 'lucide-react';

interface CategoryFilterDropdownProps {
  selected: string[];
  onChange: (categories: string[]) => void;
}

export function CategoryFilterDropdown({ selected, onChange }: CategoryFilterDropdownProps) {
  const lang = useStore((s) => s.settings.language);
  const userCategories = useStore((s) => s.categories);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const allCats = useMemo(
    () => [...DEFAULT_CATEGORIES, ...userCategories].filter(
      (cat, i, arr) => arr.findIndex((c) => c.name === cat.name) === i
    ),
    [userCategories]
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggle = (name: string) => {
    onChange(
      selected.includes(name)
        ? selected.filter((c) => c !== name)
        : [...selected, name]
    );
  };

  const label = selected.length === 0
    ? (lang === 'id' ? 'Kategori' : 'Category')
    : `${lang === 'id' ? 'Kategori' : 'Cat'} (${selected.length})`;

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 h-9 px-3 text-xs font-semibold rounded-sm border transition-colors ${
          selected.length > 0
            ? 'bg-primary-500 text-white border-primary-500'
            : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:text-primary-500'
        }`}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 w-52 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-sm shadow-lg max-h-64 overflow-y-auto">
          {allCats.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 px-3 py-2 text-xs text-[var(--color-text)] hover:bg-[var(--color-border-light)] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(cat.name)}
                onChange={() => toggle(cat.name)}
                className="accent-primary-500"
              />
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

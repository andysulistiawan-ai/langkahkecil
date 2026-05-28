interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      onClick={onChange}
      className={`relative w-[44px] h-[24px] rounded-full transition-colors duration-200 ${
        checked ? 'bg-primary-500' : 'bg-[var(--color-border)]'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-[20px] h-[20px] bg-white rounded-full shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

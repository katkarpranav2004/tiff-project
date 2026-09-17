import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface Option {
  value: string;
  label: string;
}

interface ThemedSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  ariaLabel?: string;
}

/**
 * Themed dropdown replacing the native <select>, so the open menu matches
 * the site palette (green highlight, ivory surface) instead of the OS blue.
 */
const ThemedSelect = ({ value, onChange, options, className = '', ariaLabel }: ThemedSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-md border border-subtle-border bg-white pl-3 pr-3 text-sm text-foundation-dark transition-colors hover:border-foundation-green focus:border-foundation-green focus:outline-none focus:ring-1 focus:ring-foundation-green"
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-stone-slate transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 z-30 mt-2 max-h-72 w-full min-w-[11rem] overflow-auto rounded-lg border border-subtle-border bg-white p-1 shadow-xl"
        >
          {options.map((o) => {
            const active = o.value === value;
            return (
              <li key={o.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => { onChange(o.value); setOpen(false); }}
                  className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    active
                      ? 'bg-foundation-green text-warm-ivory'
                      : 'text-foundation-dark hover:bg-parchment'
                  }`}
                >
                  <span className="truncate">{o.label}</span>
                  {active && <Check className="h-4 w-4 shrink-0 text-ochre-light" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ThemedSelect;

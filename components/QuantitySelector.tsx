"use client";

export function QuantitySelector({
  value,
  onChange,
  label,
  min = 1,
  max = 4,
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-stretch border border-surface-2" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
        className="px-3 py-2 text-small leading-none transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-30"
      >
        &minus;
      </button>
      <span
        className="flex min-w-10 items-center justify-center border-x border-surface-2 px-2 text-small tabular-nums"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
        className="px-3 py-2 text-small leading-none transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}

import { progressState } from './progress';

export type MacroTone = 'protein' | 'carbs' | 'fat' | 'kcal';

const TONES: Record<MacroTone, { text: string; bg: string; fill: string }> = {
  protein: { text: 'text-protein', bg: 'bg-protein-bg', fill: 'bg-protein' },
  carbs: { text: 'text-carbs', bg: 'bg-carbs-bg', fill: 'bg-carbs' },
  fat: { text: 'text-fat', bg: 'bg-fat-bg', fill: 'bg-fat' },
  kcal: { text: 'text-kcal', bg: 'bg-kcal-bg', fill: 'bg-kcal' },
};

const fmt = (n: number) => n.toLocaleString('es-AR', { maximumFractionDigits: 1 });

export function ProgressBar({
  label,
  value,
  target,
  unit,
  tone = 'kcal',
}: {
  label: string;
  value: number;
  target: number;
  unit: 'g' | 'kcal';
  tone?: MacroTone;
}) {
  const { percent, exceeded } = progressState(value, target);
  const t = TONES[tone];
  return (
    <div className={`rounded-xl p-3 ${t.bg}`}>
      <div className="flex items-baseline justify-between gap-2">
        <span className={`text-xs font-medium ${t.text}`}>{label}</span>
        {exceeded && (
          <span className="text-xs font-semibold text-danger">
            +{fmt(value - target)} {unit}
          </span>
        )}
      </div>
      <div className="mt-0.5 text-lg font-semibold tabular-nums">
        {fmt(value)}
        <span className={`text-xs font-normal ${t.text}`}>
          {' / '}
          {fmt(target)} {unit}
        </span>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/30"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={target}
        aria-valuenow={value}
      >
        <div className={`h-full rounded-full ${exceeded ? 'bg-danger' : t.fill}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

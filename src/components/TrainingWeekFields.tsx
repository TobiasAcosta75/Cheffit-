'use client';

import type { Intensity, TrainingDay } from '@/domain/types';
import { INTENSITY_LABELS, WEEKDAYS_DISPLAY } from '@/lib/labels';

/** Editor de la semana tipo. `week[weekday]` con 0 = domingo; se muestra de lunes a domingo. */
export function TrainingWeekFields({
  week,
  onChange,
  errors = {},
  errorPrefix = 'week.',
}: {
  week: TrainingDay[];
  onChange: (week: TrainingDay[]) => void;
  errors?: Record<string, string>;
  errorPrefix?: string;
}) {
  const update = (weekday: number, patch: Partial<TrainingDay>) => {
    const next = [...week];
    next[weekday] = { ...next[weekday], ...patch };
    onChange(next);
  };

  return (
    <ul className="flex flex-col divide-y divide-border rounded-[var(--radius-card)] border border-border bg-surface">
      {WEEKDAYS_DISPLAY.map(({ weekday, label }) => {
        const day = week[weekday];
        const error = errors[`${errorPrefix}${weekday}.time`];
        return (
          <li key={weekday} className="flex flex-col gap-2 p-3">
            <label className="flex items-center justify-between gap-3">
              <span className="font-medium">{label}</span>
              <span className="flex items-center gap-2 text-sm text-muted">
                {day.trains ? 'Entreno' : 'Descanso'}
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[var(--accent)]"
                  checked={day.trains}
                  onChange={(e) =>
                    update(weekday, e.target.checked ? { trains: true, time: day.time ?? '19:00', intensity: day.intensity ?? 'medium' } : { trains: false })
                  }
                />
              </span>
            </label>
            {day.trains && (
              <div className="grid grid-cols-2 gap-2">
                <label className="flex flex-col gap-1 text-xs text-muted">
                  Hora
                  <input
                    type="time"
                    value={day.time ?? ''}
                    onChange={(e) => update(weekday, { time: e.target.value || null })}
                    className="min-h-10 rounded-lg border border-border bg-surface-2 px-2 text-sm text-text"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs text-muted">
                  Intensidad
                  <select
                    value={day.intensity ?? 'medium'}
                    onChange={(e) => update(weekday, { intensity: e.target.value as Intensity })}
                    className="min-h-10 rounded-lg border border-border bg-surface-2 px-2 text-sm text-text"
                  >
                    {(Object.keys(INTENSITY_LABELS) as Intensity[]).map((i) => (
                      <option key={i} value={i}>
                        {INTENSITY_LABELS[i]}
                      </option>
                    ))}
                  </select>
                </label>
                {error && (
                  <p role="alert" className="col-span-2 text-xs text-danger">
                    {error}
                  </p>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

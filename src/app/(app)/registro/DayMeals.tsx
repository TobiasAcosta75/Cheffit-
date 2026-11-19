'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import type { Slot } from '@/domain/types';
import { SLOT_LABELS } from '@/lib/labels';
import { deleteMeal, updateMealGrams } from './actions';
import { FoodPicker } from './FoodPicker';

export interface MealLogView {
  id: string;
  slot: Slot;
  foodName: string;
  grams: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  kcal: number;
}

const fmt = (n: number) => n.toLocaleString('es-AR', { maximumFractionDigits: 1 });

export function DayMeals({ slots, logs }: { slots: Slot[]; logs: MealLogView[] }) {
  const router = useRouter();
  const [adding, setAdding] = useState<Slot | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {slots.map((slot) => {
        const items = logs.filter((l) => l.slot === slot);
        const kcal = items.reduce((a, l) => a + l.kcal, 0);
        return (
          <section key={slot} className="rounded-[var(--radius-card)] border border-border bg-surface p-3" aria-label={SLOT_LABELS[slot]}>
            <header className="flex items-baseline justify-between">
              <h2 className="font-semibold">{SLOT_LABELS[slot]}</h2>
              <span className="text-sm tabular-nums text-muted">{items.length ? `${kcal} kcal` : 'Sin registrar'}</span>
            </header>
            {items.length > 0 && (
              <ul className="mt-2 flex flex-col divide-y divide-border">
                {items.map((l) => (
                  <MealItem key={l.id} log={l} onChanged={() => router.refresh()} />
                ))}
              </ul>
            )}
            <div className="mt-2">
              {adding === slot ? (
                <FoodPicker
                  slot={slot}
                  onCancel={() => setAdding(null)}
                  onDone={() => {
                    setAdding(null);
                    router.refresh();
                  }}
                />
              ) : (
                <Button type="button" variant="ghost" className="w-full" onClick={() => setAdding(slot)}>
                  + Agregar a {SLOT_LABELS[slot].toLowerCase()}
                </Button>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function MealItem({ log, onChanged }: { log: MealLogView; onChanged: () => void }) {
  const [editing, setEditing] = useState(false);
  const [grams, setGrams] = useState(String(log.grams));
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function save() {
    const g = Number(grams.replace(',', '.'));
    start(async () => {
      const res = await updateMealGrams({ id: log.id, grams: g });
      if (res.ok) {
        setEditing(false);
        setError(null);
        onChanged();
      } else setError(Object.values(res.errors)[0] ?? 'No pudimos guardar.');
    });
  }

  function remove() {
    start(async () => {
      const res = await deleteMeal(log.id);
      if (res.ok) onChanged();
      else setError(Object.values(res.errors)[0] ?? 'No pudimos borrar.');
    });
  }

  return (
    <li className="py-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm">{log.foodName}</p>
          <p className="text-xs tabular-nums text-muted">
            {fmt(log.grams)} g · {log.kcal} kcal · <span className="text-protein">P {fmt(log.proteinG)}</span> ·{' '}
            <span className="text-carbs">C {fmt(log.carbsG)}</span> · <span className="text-fat">G {fmt(log.fatG)}</span>
          </p>
        </div>
        {!editing && (
          <div className="flex shrink-0 gap-1">
            <button type="button" className="min-h-9 rounded-lg px-2 text-xs text-accent hover:bg-surface-2" onClick={() => setEditing(true)}>
              Editar
            </button>
            <button type="button" className="min-h-9 rounded-lg px-2 text-xs text-danger hover:bg-surface-2" onClick={remove} disabled={pending}>
              Borrar
            </button>
          </div>
        )}
      </div>
      {editing && (
        <div className="mt-2 flex items-end gap-2">
          <label className="flex flex-1 flex-col gap-1 text-xs text-muted">
            Gramos
            <input
              inputMode="decimal"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              className="min-h-10 rounded-lg border border-border bg-surface-2 px-2 text-sm text-text"
              autoFocus
            />
          </label>
          <Button type="button" onClick={() => setEditing(false)}>
            Cancelar
          </Button>
          <Button type="button" variant="primary" onClick={save} disabled={pending}>
            Guardar
          </Button>
        </div>
      )}
      {error && (
        <p role="alert" className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </li>
  );
}

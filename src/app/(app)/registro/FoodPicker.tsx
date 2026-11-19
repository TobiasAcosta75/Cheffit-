'use client';

import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { macrosForGrams } from '@/domain/foods';
import type { Slot } from '@/domain/types';
import { logMeal, searchFoods, type FoodOption } from './actions';

const fmt = (n: number) => n.toLocaleString('es-AR', { maximumFractionDigits: 1 });

export function FoodPicker({ slot, onDone, onCancel }: { slot: Slot; onDone: () => void; onCancel: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodOption[]>([]);
  const [searching, startSearch] = useTransition();
  const [saving, startSave] = useTransition();
  const [food, setFood] = useState<FoodOption | null>(null);
  const [measure, setMeasure] = useState<string>('g');
  const [amount, setAmount] = useState('100');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (food) return;
    const id = setTimeout(() => {
      startSearch(async () => setResults(query.trim().length >= 2 ? await searchFoods(query) : []));
    }, 250);
    return () => clearTimeout(id);
  }, [query, food]);

  const qty = Number(amount.replace(',', '.'));
  const measureGrams = measure === 'g' ? 1 : (food?.measures.find((m) => m.label === measure)?.grams ?? 0);
  const grams = Number.isFinite(qty) ? Math.round(qty * measureGrams * 10) / 10 : 0;
  const preview = food && grams > 0 ? macrosForGrams(food, grams) : null;

  function choose(f: FoodOption) {
    setFood(f);
    if (f.measures.length) {
      setMeasure(f.measures[0].label);
      setAmount('1');
    } else {
      setMeasure('g');
      setAmount('100');
    }
  }

  function save() {
    if (!food) return;
    if (!(grams > 0 && grams <= 5000)) {
      setError('Ingresá una cantidad entre 1 y 5000 g.');
      return;
    }
    setError(null);
    startSave(async () => {
      const res = await logMeal({ foodId: food.id, grams, slot });
      if (res.ok) onDone();
      else setError(Object.values(res.errors)[0] ?? 'No pudimos guardar.');
    });
  }

  if (!food) {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface-2 p-3">
        <Input label="Buscar alimento" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="pechuga, arroz, banana…" autoFocus />
        {searching && <p className="text-xs text-muted">Buscando…</p>}
        {!searching && query.trim().length >= 2 && results.length === 0 && <p className="text-sm text-muted">No encontramos alimentos con ese nombre.</p>}
        <ul className="flex max-h-72 flex-col overflow-y-auto">
          {results.map((f) => (
            <li key={f.id}>
              <button type="button" onClick={() => choose(f)} className="flex w-full items-baseline justify-between gap-3 rounded-lg px-2 py-2.5 text-left hover:bg-surface">
                <span className="text-sm">
                  {f.name}
                  {f.ownerId && <span className="ml-1.5 text-xs text-accent">tuyo</span>}
                </span>
                <span className="shrink-0 text-xs tabular-nums text-muted">{fmt(f.kcal)} kcal/100 g</span>
              </button>
            </li>
          ))}
        </ul>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface-2 p-3">
      <div className="flex items-baseline justify-between gap-2">
        <p className="font-semibold">{food.name}</p>
        <button type="button" className="text-xs text-accent" onClick={() => setFood(null)}>
          Cambiar
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input label="Cantidad" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Medida</span>
          <select
            value={measure}
            onChange={(e) => setMeasure(e.target.value)}
            className="min-h-11 rounded-xl border border-border bg-surface px-2 text-text"
          >
            {food.measures.map((m) => (
              <option key={m.label} value={m.label}>
                {m.label} ({fmt(m.grams)} g)
              </option>
            ))}
            <option value="g">gramos</option>
          </select>
        </label>
      </div>
      {preview && (
        <p className="text-sm tabular-nums">
          <span className="text-muted">{fmt(grams)} g · </span>
          <span className="font-semibold">{preview.kcal} kcal</span> · <span className="text-protein">P {fmt(preview.proteinG)}</span> ·{' '}
          <span className="text-carbs">C {fmt(preview.carbsG)}</span> · <span className="text-fat">G {fmt(preview.fatG)}</span>
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="button" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button type="button" variant="primary" onClick={save} disabled={saving} className="flex-1">
          {saving ? 'Guardando…' : 'Agregar'}
        </Button>
      </div>
    </div>
  );
}

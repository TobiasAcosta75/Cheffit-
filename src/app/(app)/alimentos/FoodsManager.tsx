'use client';

import { useEffect, useState, useTransition } from 'react';
import { toNumber } from '@/components/StageRulesFields';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { searchFoods, type FoodOption } from '../registro/actions';
import { deleteOwnFood, saveFood } from './actions';

const fmt = (n: number) => n.toLocaleString('es-AR', { maximumFractionDigits: 1 });

type Editing = { mode: 'new' } | { mode: 'edit'; food: FoodOption };

export function FoodsManager({ userId, isAdmin }: { userId: string; isAdmin: boolean }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodOption[]>([]);
  const [searching, startSearch] = useTransition();
  const [editing, setEditing] = useState<Editing | null>(null);
  const [version, setVersion] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      startSearch(async () => setResults(query.trim().length >= 2 ? await searchFoods(query) : []));
    }, 250);
    return () => clearTimeout(id);
  }, [query, version]);

  const actionLabel = (f: FoodOption) => (f.ownerId === userId ? 'Editar' : isAdmin ? 'Editar global' : 'Corregir');

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Alimentos</h1>
          <p className="text-sm text-muted">Valores cada 100 g.</p>
        </div>
        {editing === null && (
          <Button type="button" variant="primary" onClick={() => setEditing({ mode: 'new' })}>
            Nuevo
          </Button>
        )}
      </header>

      {message && <p className="rounded-xl bg-surface-2 p-3 text-sm">{message}</p>}

      {editing && (
        <FoodEditor
          key={editing.mode === 'new' ? 'new' : editing.food.id}
          food={editing.mode === 'edit' ? editing.food : null}
          note={
            editing.mode === 'edit' && editing.food.ownerId === null && !isAdmin
              ? 'Se guarda como tu versión: solo vos vas a ver estos valores.'
              : editing.mode === 'edit' && editing.food.ownerId === null
                ? 'Sos admin: el cambio se aplica al alimento global para todos.'
                : null
          }
          onCancel={() => setEditing(null)}
          onSaved={(msg) => {
            setEditing(null);
            setMessage(msg);
            setVersion((v) => v + 1);
          }}
        />
      )}

      <Input label="Buscar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="merluza, queso, avena…" />
      {searching && <p className="text-xs text-muted">Buscando…</p>}
      {!searching && query.trim().length >= 2 && results.length === 0 && <p className="text-sm text-muted">No hay resultados. Podés crearlo con “Nuevo”.</p>}

      <ul className="flex flex-col divide-y divide-border rounded-[var(--radius-card)] border border-border bg-surface">
        {results.map((f) => (
          <li key={f.id} className="flex items-start justify-between gap-2 p-3">
            <div className="min-w-0">
              <p className="text-sm">
                {f.name}
                {f.ownerId === userId && <span className="ml-1.5 text-xs text-accent">{f.overridesFoodId ? 'tu versión' : 'tuyo'}</span>}
              </p>
              <p className="text-xs tabular-nums text-muted">
                {fmt(f.kcal)} kcal · <span className="text-protein">P {fmt(f.protein)}</span> · <span className="text-carbs">C {fmt(f.carbs)}</span> ·{' '}
                <span className="text-fat">G {fmt(f.fat)}</span>
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <button type="button" className="min-h-9 rounded-lg px-2 text-xs text-accent hover:bg-surface-2" onClick={() => setEditing({ mode: 'edit', food: f })}>
                {actionLabel(f)}
              </button>
              {f.ownerId === userId && (
                <button
                  type="button"
                  className="min-h-9 rounded-lg px-2 text-xs text-danger hover:bg-surface-2"
                  onClick={async () => {
                    const what = f.overridesFoodId ? 'tu versión (vas a volver a ver el valor original)' : 'este alimento';
                    if (!confirm(`¿Borrar ${what}?`)) return;
                    const res = await deleteOwnFood(f.id);
                    setMessage(res.ok ? 'Alimento borrado.' : (Object.values(res.errors)[0] ?? 'No pudimos borrarlo.'));
                    setVersion((v) => v + 1);
                  }}
                >
                  {f.overridesFoodId ? 'Restaurar' : 'Borrar'}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FoodEditor({ food, note, onCancel, onSaved }: { food: FoodOption | null; note: string | null; onCancel: () => void; onSaved: (msg: string) => void }) {
  const [form, setForm] = useState({
    name: food?.name ?? '',
    category: food?.category ?? 'otros',
    kcal: food ? String(food.kcal) : '',
    protein: food ? String(food.protein) : '',
    carbs: food ? String(food.carbs) : '',
    fat: food ? String(food.fat) : '',
    fiber: food ? String(food.fiber) : '0',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, start] = useTransition();
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  function save() {
    start(async () => {
      const res = await saveFood({
        targetId: food?.id,
        form: {
          name: form.name,
          category: form.category,
          kcal: toNumber(form.kcal) as number,
          protein: toNumber(form.protein) as number,
          carbs: toNumber(form.carbs) as number,
          fat: toNumber(form.fat) as number,
          fiber: toNumber(form.fiber) ?? 0,
        },
      });
      if (res.ok) onSaved(food ? 'Cambios guardados.' : 'Alimento creado.');
      else setErrors(res.errors);
    });
  }

  return (
    <Card className="flex flex-col gap-3">
      <h2 className="font-semibold">{food ? 'Editar alimento' : 'Nuevo alimento'}</h2>
      {note && <p className="text-xs text-muted">{note}</p>}
      <Input label="Nombre" value={form.name} onChange={set('name')} error={errors.name} placeholder="Queso cremoso" />
      <Input label="Calorías (kcal)" inputMode="decimal" value={form.kcal} onChange={set('kcal')} error={errors.kcal} />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Proteínas (g)" inputMode="decimal" value={form.protein} onChange={set('protein')} error={errors.protein} />
        <Input label="Carbohidratos (g)" inputMode="decimal" value={form.carbs} onChange={set('carbs')} error={errors.carbs} />
        <Input label="Grasas (g)" inputMode="decimal" value={form.fat} onChange={set('fat')} error={errors.fat} />
        <Input label="Fibra (g)" inputMode="decimal" value={form.fiber} onChange={set('fiber')} error={errors.fiber} />
      </div>
      {errors._ && (
        <p role="alert" className="text-sm text-danger">
          {errors._}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="button" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button type="button" variant="primary" onClick={save} disabled={pending} className="flex-1">
          {pending ? 'Guardando…' : 'Guardar'}
        </Button>
      </div>
    </Card>
  );
}

import type { SupabaseClient } from '@supabase/supabase-js';
import { normalizeForSearch, resolveOverrides } from '@/domain/foods';
import type { Food } from '@/domain/types';
import { FOOD_COLUMNS, rowToFood, type FoodRow } from './mappers';
import type { Database } from './supabase/database.types';

export type Measure = { label: string; grams: number };
export type FoodOption = Food & { measures: Measure[] };

/** Escapa los comodines de LIKE en el texto que escribe el usuario. */
function escapeLike(s: string): string {
  return s.replace(/[\\%_]/g, (c) => `\\${c}`);
}

/** Búsqueda de alimentos visibles para el usuario (lo filtra RLS). */
export async function searchFoodsFor(supabase: SupabaseClient<Database>, userId: string, query: string): Promise<FoodOption[]> {
  const q = normalizeForSearch(query);
  if (q.length < 2) return [];

  // Globales que el usuario reemplazó con su versión: se excluyen en la consulta, aunque la copia
  // tenga otro nombre o no entre en el mismo resultado.
  const { data: copies } = await supabase.from('foods').select('overrides_food_id').eq('owner_id', userId).not('overrides_food_id', 'is', null);
  const overridden = (copies ?? []).map((c) => c.overrides_food_id).filter((id): id is string => id !== null);

  let request = supabase
    .from('foods')
    .select(`${FOOD_COLUMNS}, household_measures(label, grams)`)
    .ilike('search_name', `%${escapeLike(q)}%`)
    .order('name')
    .limit(20);
  if (overridden.length > 0) request = request.not('id', 'in', `(${overridden.join(',')})`);
  const { data, error } = await request;
  if (error || !data) return [];

  const rows = data as (FoodRow & { household_measures: { label: string; grams: number }[] })[];
  const toMeasures = (ms: { label: string; grams: number }[]) => ms.map((m) => ({ label: m.label, grams: Number(m.grams) }));

  // Una copia sin medidas propias hereda las del global que reemplaza.
  const needInherited = rows.filter((r) => r.overrides_food_id && r.household_measures.length === 0).map((r) => r.overrides_food_id as string);
  const inherited = new Map<string, Measure[]>();
  if (needInherited.length > 0) {
    const { data: ms } = await supabase.from('household_measures').select('food_id, label, grams').in('food_id', needInherited);
    for (const m of ms ?? []) inherited.set(m.food_id, [...(inherited.get(m.food_id) ?? []), { label: m.label, grams: Number(m.grams) }]);
  }

  const options: FoodOption[] = rows.map((r) => {
    const own = toMeasures(r.household_measures);
    const measures = own.length === 0 && r.overrides_food_id ? (inherited.get(r.overrides_food_id) ?? []) : own;
    return { ...rowToFood(r), measures };
  });
  return resolveOverrides(options, userId);
}

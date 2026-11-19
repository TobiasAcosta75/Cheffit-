'use server';

import { normalizeForSearch } from '@/domain/foods';
import { requireUser } from '@/lib/auth';
import { FOOD_COLUMNS, rowToFood } from '@/lib/mappers';
import { createServerSupabase } from '@/lib/supabase/server';
import { fieldErrors } from '@/lib/validation';
import { buildOverride, foodFormSchema, type FoodForm } from './food-override';

export type ActionResult = { ok: true } | { ok: false; errors: Record<string, string> };
const fail = (message: string): ActionResult => ({ ok: false, errors: { _: message } });

/**
 * Guarda un alimento:
 * - sin `targetId`: crea uno propio;
 * - propio: lo actualiza;
 * - global y el usuario es admin: actualiza el global;
 * - global y no es admin: crea (o actualiza) su copia personal.
 */
export async function saveFood(input: { targetId?: string; form: FoodForm }): Promise<ActionResult> {
  const { user, profile } = await requireUser();
  const parsed = foodFormSchema.safeParse(input.form);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const f = parsed.data;
  const values = {
    name: f.name,
    search_name: normalizeForSearch(f.name),
    category: f.category,
    kcal_100: f.kcal,
    protein_100: f.protein,
    carbs_100: f.carbs,
    fat_100: f.fat,
    fiber_100: f.fiber,
  };
  const supabase = await createServerSupabase();

  if (!input.targetId) {
    const { error } = await supabase.from('foods').insert({ ...values, owner_id: user.id, source: 'user' });
    return error ? fail('No pudimos crear el alimento.') : { ok: true };
  }

  const { data: target } = await supabase.from('foods').select(FOOD_COLUMNS).eq('id', input.targetId).maybeSingle();
  if (!target) return fail('No encontramos ese alimento.');

  if (target.owner_id === user.id || (target.owner_id === null && profile.is_admin)) {
    const { error } = await supabase.from('foods').update(values).eq('id', target.id);
    return error ? fail('No pudimos guardar los cambios.') : { ok: true };
  }

  const { data: existingCopy } = await supabase.from('foods').select('id').eq('owner_id', user.id).eq('overrides_food_id', target.id).maybeSingle();
  if (existingCopy) {
    const { error } = await supabase.from('foods').update(values).eq('id', existingCopy.id);
    return error ? fail('No pudimos guardar los cambios.') : { ok: true };
  }
  const copy = buildOverride(rowToFood(target), { name: f.name, kcal: f.kcal, protein: f.protein, carbs: f.carbs, fat: f.fat, fiber: f.fiber }, user.id);
  const { error } = await supabase.from('foods').insert(copy);
  return error ? fail('No pudimos guardar tu corrección.') : { ok: true };
}

/** Borra un alimento propio (o una copia personal, volviendo a ver el global). */
export async function deleteOwnFood(id: string): Promise<ActionResult> {
  const { user } = await requireUser();
  const supabase = await createServerSupabase();
  const { error } = await supabase.from('foods').delete().eq('id', id).eq('owner_id', user.id);
  return error ? fail('No pudimos borrar el alimento.') : { ok: true };
}

'use server';

import { macrosForGrams } from '@/domain/foods';
import { todayIn } from '@/domain/dates';
import { requireUser } from '@/lib/auth';
import { searchFoodsFor, type FoodOption } from '@/lib/food-search';
import { FOOD_COLUMNS, rowToFood } from '@/lib/mappers';
import { createServerSupabase } from '@/lib/supabase/server';
import { fieldErrors } from '@/lib/validation';
import { buildMealLog } from './meal-log';
import { logMealSchema, updateMealGramsSchema, type LogMealInput } from './schema';

export type { FoodOption, Measure } from '@/lib/food-search';
export type ActionResult = { ok: true } | { ok: false; errors: Record<string, string> };

const fail = (message: string): ActionResult => ({ ok: false, errors: { _: message } });

export async function searchFoods(query: string): Promise<FoodOption[]> {
  const { user } = await requireUser();
  return searchFoodsFor(await createServerSupabase(), user.id, query);
}

export async function logMeal(input: LogMealInput): Promise<ActionResult> {
  const { user, profile } = await requireUser();
  const parsed = logMealSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const supabase = await createServerSupabase();
  const { data: row } = await supabase.from('foods').select(FOOD_COLUMNS).eq('id', parsed.data.foodId).maybeSingle();
  if (!row) return fail('No encontramos ese alimento.');
  const log = buildMealLog(rowToFood(row), parsed.data.grams, parsed.data.slot, todayIn(profile.timezone));
  const { error } = await supabase.from('meal_logs').insert({ ...log, user_id: user.id });
  return error ? fail('No pudimos guardar el registro. Probá de nuevo.') : { ok: true };
}

/** Cambia los gramos y recalcula el snapshot con los valores actuales del alimento. */
export async function updateMealGrams(input: { id: string; grams: number }): Promise<ActionResult> {
  await requireUser();
  const parsed = updateMealGramsSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const supabase = await createServerSupabase();
  const { data: log } = await supabase.from('meal_logs').select('food_id, grams, protein_g, carbs_g, fat_g, kcal').eq('id', parsed.data.id).maybeSingle();
  if (!log) return fail('No encontramos ese registro.');

  const { grams } = parsed.data;
  let macros;
  const { data: foodRow } = log.food_id ? await supabase.from('foods').select(FOOD_COLUMNS).eq('id', log.food_id).maybeSingle() : { data: null };
  if (foodRow) {
    macros = macrosForGrams(rowToFood(foodRow), grams);
  } else {
    // El alimento ya no existe: se escala el snapshot guardado.
    const k = grams / Number(log.grams);
    const r1 = (n: number) => Math.round(n * 10) / 10;
    macros = { proteinG: r1(Number(log.protein_g) * k), carbsG: r1(Number(log.carbs_g) * k), fatG: r1(Number(log.fat_g) * k), kcal: Math.round(Number(log.kcal) * k) };
  }
  const { error } = await supabase
    .from('meal_logs')
    .update({ grams, protein_g: macros.proteinG, carbs_g: macros.carbsG, fat_g: macros.fatG, kcal: macros.kcal })
    .eq('id', parsed.data.id);
  return error ? fail('No pudimos actualizar el registro.') : { ok: true };
}

export async function deleteMeal(id: string): Promise<ActionResult> {
  await requireUser();
  const supabase = await createServerSupabase();
  const { error } = await supabase.from('meal_logs').delete().eq('id', id);
  return error ? fail('No pudimos borrar el registro.') : { ok: true };
}

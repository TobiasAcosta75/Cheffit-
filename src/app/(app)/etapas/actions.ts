'use server';

import { todayIn } from '@/domain/dates';
import { requireUser } from '@/lib/auth';
import { createServerSupabase } from '@/lib/supabase/server';
import { fieldErrors } from '@/lib/validation';
import { stageFormSchema, type StageFormInput } from './schema';

export type ActionResult = { ok: true } | { ok: false; errors: Record<string, string> };
const fail = (message: string): ActionResult => ({ ok: false, errors: { _: message } });

export async function saveStage(input: StageFormInput): Promise<ActionResult> {
  const { user } = await requireUser();
  const parsed = stageFormSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const s = parsed.data;
  const row = {
    user_id: user.id,
    name: s.name,
    start_date: s.startDate,
    end_date: s.endDate,
    goal: s.goal,
    mode: s.mode,
    protein_g_per_kg: s.proteinGPerKg,
    carbs_training_g_per_kg: s.carbsTrainingGPerKg,
    carbs_rest_g_per_kg: s.carbsRestGPerKg,
    fat_g_per_kg: s.fatGPerKg,
    notes: s.notes || null,
  };
  const supabase = await createServerSupabase();
  const { error } = s.id ? await supabase.from('stages').update(row).eq('id', s.id) : await supabase.from('stages').insert(row);
  return error ? fail('No pudimos guardar la etapa. Probá de nuevo.') : { ok: true };
}

/** Cierra una etapa hoy (o el día que empezó, si empieza en el futuro no se puede cerrar antes). */
export async function closeStage(id: string): Promise<ActionResult> {
  const { profile } = await requireUser();
  const today = todayIn(profile.timezone);
  const supabase = await createServerSupabase();
  const { data: stage } = await supabase.from('stages').select('start_date').eq('id', id).maybeSingle();
  if (!stage) return fail('No encontramos esa etapa.');
  const endDate = stage.start_date > today ? stage.start_date : today;
  const { error } = await supabase.from('stages').update({ end_date: endDate }).eq('id', id);
  return error ? fail('No pudimos cerrar la etapa.') : { ok: true };
}

export async function deleteStage(id: string): Promise<ActionResult> {
  await requireUser();
  const supabase = await createServerSupabase();
  const { error } = await supabase.from('stages').delete().eq('id', id);
  return error ? fail('No pudimos borrar la etapa.') : { ok: true };
}

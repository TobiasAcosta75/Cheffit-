'use server';

import { redirect } from 'next/navigation';
import { todayIn } from '@/domain/dates';
import { requireUser } from '@/lib/auth';
import { createServerSupabase } from '@/lib/supabase/server';
import { fieldErrors } from '@/lib/validation';
import { buildOnboardingSchema, type OnboardingInput } from './schema';

export type OnboardingResult = { ok: false; errors: Record<string, string> };

/**
 * Guarda todo el onboarding. Marca `onboarded = true` al final, así un fallo a mitad de camino
 * deja al usuario en el onboarding para reintentar (las escrituras previas son upserts).
 */
export async function completeOnboarding(input: OnboardingInput): Promise<OnboardingResult> {
  const { user, profile } = await requireUser({ allowNotOnboarded: true });
  const today = todayIn(profile.timezone);
  const parsed = buildOnboardingSchema(today).safeParse(input);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const d = parsed.data;
  const supabase = await createServerSupabase();

  const fail = (message: string) => ({ ok: false as const, errors: { _: message } });

  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      display_name: d.displayName || null,
      sex: d.sex,
      birth_date: d.birthDate,
      height_cm: d.heightCm,
      activity_level: d.activity,
      goal: d.goal,
      meal_slots: d.mealSlots,
      avoided_foods: d.avoidedFoods,
      restrictions: d.restrictions,
      max_cook_minutes: d.maxCookMinutes,
      reference_weight_kg: d.weightKg,
    })
    .eq('id', user.id);
  if (profileError) return fail('No pudimos guardar tu perfil. Probá de nuevo.');

  const { error: weightError } = await supabase
    .from('weight_entries')
    .upsert({ user_id: user.id, date: today, weight_kg: d.weightKg }, { onConflict: 'user_id,date' });
  if (weightError) return fail('No pudimos guardar tu peso. Probá de nuevo.');

  const { error: weekError } = await supabase.from('training_week').upsert(
    d.week.map((day, weekday) => ({ user_id: user.id, weekday, trains: day.trains, time: day.time, intensity: day.intensity })),
    { onConflict: 'user_id,weekday' },
  );
  if (weekError) return fail('No pudimos guardar tu semana de entreno. Probá de nuevo.');

  // Si ya había una etapa creada hoy (reintento), no se duplica.
  const { data: existingStage } = await supabase.from('stages').select('id').eq('user_id', user.id).eq('start_date', today).maybeSingle();
  const stageRow = {
    user_id: user.id,
    name: d.stage.name,
    start_date: today,
    goal: d.goal,
    mode: d.stage.mode,
    protein_g_per_kg: d.stage.proteinGPerKg,
    carbs_training_g_per_kg: d.stage.carbsTrainingGPerKg,
    carbs_rest_g_per_kg: d.stage.carbsRestGPerKg,
    fat_g_per_kg: d.stage.fatGPerKg,
    notes: d.stage.notes || null,
  };
  const { error: stageError } = existingStage
    ? await supabase.from('stages').update(stageRow).eq('id', existingStage.id)
    : await supabase.from('stages').insert(stageRow);
  if (stageError) return fail('No pudimos guardar tu etapa. Probá de nuevo.');

  const { error: doneError } = await supabase.from('profiles').update({ onboarded: true }).eq('id', user.id);
  if (doneError) return fail('No pudimos terminar el registro. Probá de nuevo.');

  redirect('/');
}

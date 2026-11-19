'use server';

import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { createServerSupabase } from '@/lib/supabase/server';
import { fieldErrors, isoDateSchema, trainingDaySchema } from '@/lib/validation';

export type ActionResult = { ok: true } | { ok: false; errors: Record<string, string> };
const fail = (message: string): ActionResult => ({ ok: false, errors: { _: message } });

const weekSchema = z.array(trainingDaySchema).length(7);
const overrideSchema = z.object({ date: isoDateSchema, day: trainingDaySchema });

export async function saveTrainingWeek(week: z.input<typeof weekSchema>): Promise<ActionResult> {
  const { user } = await requireUser();
  const parsed = weekSchema.safeParse(week);
  if (!parsed.success) return { ok: false, errors: Object.fromEntries(Object.entries(fieldErrors(parsed.error)).map(([k, v]) => [`week.${k}`, v])) };
  const supabase = await createServerSupabase();
  const { error } = await supabase.from('training_week').upsert(
    parsed.data.map((d, weekday) => ({ user_id: user.id, weekday, trains: d.trains, time: d.time, intensity: d.intensity })),
    { onConflict: 'user_id,weekday' },
  );
  return error ? fail('No pudimos guardar la semana.') : { ok: true };
}

export async function saveOverride(input: z.input<typeof overrideSchema>): Promise<ActionResult> {
  const { user } = await requireUser();
  const parsed = overrideSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const { date, day } = parsed.data;
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from('training_overrides')
    .upsert({ user_id: user.id, date, trains: day.trains, time: day.time, intensity: day.intensity }, { onConflict: 'user_id,date' });
  return error ? fail('No pudimos guardar el cambio.') : { ok: true };
}

export async function deleteOverride(date: string): Promise<ActionResult> {
  const { user } = await requireUser();
  const supabase = await createServerSupabase();
  const { error } = await supabase.from('training_overrides').delete().eq('user_id', user.id).eq('date', date);
  return error ? fail('No pudimos quitar el cambio.') : { ok: true };
}

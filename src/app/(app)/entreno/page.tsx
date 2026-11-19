import { Suspense } from 'react';
import { todayIn } from '@/domain/dates';
import { requireUser } from '@/lib/auth';
import { rowToOverride, rowsToTrainingWeek } from '@/lib/mappers';
import { createServerSupabase } from '@/lib/supabase/server';
import { TrainingManager } from './TrainingManager';

export default function TrainingPage() {
  return (
    <Suspense fallback={<p className="text-muted">Cargando entrenamiento…</p>}>
      <TrainingContent />
    </Suspense>
  );
}

async function TrainingContent() {
  const { user, profile } = await requireUser();
  const today = todayIn(profile.timezone);
  const supabase = await createServerSupabase();
  const [weekRes, overridesRes] = await Promise.all([
    supabase.from('training_week').select('weekday, trains, time, intensity').eq('user_id', user.id),
    supabase.from('training_overrides').select('date, trains, time, intensity').eq('user_id', user.id).gte('date', today).order('date'),
  ]);
  const week = rowsToTrainingWeek(weekRes.data ?? []);
  return (
    <TrainingManager
      week={[week[0], week[1], week[2], week[3], week[4], week[5], week[6]]}
      overrides={(overridesRes.data ?? []).map(rowToOverride)}
      today={today}
    />
  );
}

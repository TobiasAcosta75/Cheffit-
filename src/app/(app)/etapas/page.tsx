import { Suspense } from 'react';
import { ageOn, todayIn } from '@/domain/dates';
import { activeStage } from '@/domain/stages';
import type { ActivityLevel, Goal, Sex } from '@/domain/types';
import { requireUser } from '@/lib/auth';
import { rowToStage } from '@/lib/mappers';
import { createServerSupabase } from '@/lib/supabase/server';
import { StagesManager } from './StagesManager';

export default function StagesPage() {
  return (
    <Suspense fallback={<p className="text-muted">Cargando etapas…</p>}>
      <StagesContent />
    </Suspense>
  );
}

async function StagesContent() {
  const { user, profile } = await requireUser();
  const today = todayIn(profile.timezone);
  const supabase = await createServerSupabase();
  const { data } = await supabase.from('stages').select('*').eq('user_id', user.id).order('start_date', { ascending: false });
  const stages = (data ?? []).map(rowToStage);
  const active = activeStage(stages, today);

  return (
    <StagesManager
      stages={stages}
      activeId={active?.id ?? null}
      today={today}
      weightKg={Number(profile.reference_weight_kg)}
      person={{
        sex: profile.sex as Sex,
        heightCm: Number(profile.height_cm),
        ageYears: profile.birth_date ? ageOn(profile.birth_date, today) : 30,
        activity: profile.activity_level as ActivityLevel,
        goal: profile.goal as Goal,
      }}
    />
  );
}

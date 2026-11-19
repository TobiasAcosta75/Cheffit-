import Link from 'next/link';
import { Suspense } from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { todayIn } from '@/domain/dates';
import { activeStage } from '@/domain/stages';
import { dayTargets, sumMacros } from '@/domain/targets';
import { dayTypeOf, resolveTrainingDay } from '@/domain/training';
import { SLOTS, type ISODate, type Slot } from '@/domain/types';
import { requireUser } from '@/lib/auth';
import { INTENSITY_LABELS } from '@/lib/labels';
import { rowToOverride, rowToStage, rowsToTrainingWeek } from '@/lib/mappers';
import { createServerSupabase } from '@/lib/supabase/server';
import { DayMeals, type MealLogView } from './registro/DayMeals';

export default function TodayPage() {
  return (
    <Suspense fallback={<p className="text-muted">Cargando tu día…</p>}>
      <TodayContent />
    </Suspense>
  );
}

function formatLongDate(date: ISODate): string {
  const [y, m, d] = date.split('-').map(Number);
  const text = new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, d)));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function TodayContent() {
  const { user, profile } = await requireUser();
  const today = todayIn(profile.timezone);
  const supabase = await createServerSupabase();

  const [stagesRes, weekRes, overrideRes, logsRes] = await Promise.all([
    supabase.from('stages').select('*').eq('user_id', user.id),
    supabase.from('training_week').select('weekday, trains, time, intensity').eq('user_id', user.id),
    supabase.from('training_overrides').select('date, trains, time, intensity').eq('user_id', user.id).eq('date', today),
    supabase.from('meal_logs').select('*').eq('user_id', user.id).eq('date', today).order('created_at'),
  ]);

  const stage = activeStage((stagesRes.data ?? []).map(rowToStage), today);
  const trainingDay = resolveTrainingDay(rowsToTrainingWeek(weekRes.data ?? []), (overrideRes.data ?? []).map(rowToOverride), today);
  const dayType = dayTypeOf(trainingDay);
  const weight = Number(profile.reference_weight_kg);

  const logs: MealLogView[] = (logsRes.data ?? []).map((l) => ({
    id: l.id,
    slot: l.slot as Slot,
    foodName: l.food_name,
    grams: Number(l.grams),
    proteinG: Number(l.protein_g),
    carbsG: Number(l.carbs_g),
    fatG: Number(l.fat_g),
    kcal: Number(l.kcal),
  }));
  const consumed = sumMacros(logs);
  const profileSlots = profile.meal_slots as Slot[];
  const slots = SLOTS.filter((s) => profileSlots.includes(s) || logs.some((l) => l.slot === s));

  return (
    <div className="flex flex-col gap-4">
      <header>
        <p className="text-sm text-muted">{formatLongDate(today)}</p>
        <h1 className="text-2xl font-bold">Hoy{profile.display_name ? `, ${profile.display_name}` : ''}</h1>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className={`rounded-md px-2 py-1 font-semibold ${dayType === 'training' ? 'bg-accent text-on-accent' : 'bg-surface-2 text-muted'}`}>
            {dayType === 'training'
              ? `Entreno${trainingDay.time ? ` ${trainingDay.time}` : ''}${trainingDay.intensity ? ` · ${INTENSITY_LABELS[trainingDay.intensity].toLowerCase()}` : ''}`
              : 'Descanso'}
          </span>
          {stage && <span className="rounded-md bg-surface-2 px-2 py-1 text-muted">{stage.name}</span>}
        </div>
      </header>

      {stage ? (
        <MacroSummary target={dayTargets(stage, weight, dayType)} consumed={consumed} />
      ) : (
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-4">
          <p className="font-semibold">No tenés una etapa activa</p>
          <p className="mt-1 text-sm text-muted">Creá una etapa para calcular tus macros del día.</p>
          <Link href="/etapas" className="mt-3 inline-flex min-h-11 items-center rounded-xl bg-accent px-4 text-sm font-semibold text-on-accent">
            Ir a etapas
          </Link>
        </div>
      )}

      <DayMeals slots={slots} logs={logs} />
    </div>
  );
}

function MacroSummary({ target, consumed }: { target: ReturnType<typeof dayTargets>; consumed: ReturnType<typeof sumMacros> }) {
  return (
    <section aria-label="Macros del día" className="flex flex-col gap-2">
      <ProgressBar label="Calorías" value={consumed.kcal} target={target.kcal} unit="kcal" tone="kcal" />
      <div className="grid grid-cols-3 gap-2">
        <ProgressBar label="Proteínas" value={consumed.proteinG} target={target.proteinG} unit="g" tone="protein" />
        <ProgressBar label="Carbos" value={consumed.carbsG} target={target.carbsG} unit="g" tone="carbs" />
        <ProgressBar label="Grasas" value={consumed.fatG} target={target.fatG} unit="g" tone="fat" />
      </div>
    </section>
  );
}

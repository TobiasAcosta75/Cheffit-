import type { Food, FoodSource, Goal, Intensity, Stage, TrainingDay, TrainingOverride, TrainingWeek, Weekday } from '@/domain/types';
import type { Database } from './supabase/database.types';

type Tables = Database['public']['Tables'];
type StageRow = Pick<
  Tables['stages']['Row'],
  'id' | 'name' | 'start_date' | 'end_date' | 'goal' | 'mode' | 'notes' | 'created_at' | 'protein_g_per_kg' | 'carbs_training_g_per_kg' | 'carbs_rest_g_per_kg' | 'fat_g_per_kg'
>;
type WeekRow = Pick<Tables['training_week']['Row'], 'weekday' | 'trains' | 'time' | 'intensity'>;
type OverrideRow = Pick<Tables['training_overrides']['Row'], 'date' | 'trains' | 'time' | 'intensity'>;
export type FoodRow = Pick<
  Tables['foods']['Row'],
  'id' | 'owner_id' | 'overrides_food_id' | 'name' | 'category' | 'source' | 'kcal_100' | 'protein_100' | 'carbs_100' | 'fat_100' | 'fiber_100'
>;

/** Postgres devuelve `time` como "HH:MM:SS"; la app usa "HH:MM". */
export function normalizeTime(t: string | null): string | null {
  return t ? t.slice(0, 5) : null;
}

const REST: TrainingDay = { trains: false, time: null, intensity: null };

export function rowsToTrainingWeek(rows: WeekRow[]): TrainingWeek {
  const week = { 0: REST, 1: REST, 2: REST, 3: REST, 4: REST, 5: REST, 6: REST } as TrainingWeek;
  for (const r of rows) {
    week[r.weekday as Weekday] = { trains: r.trains, time: normalizeTime(r.time), intensity: r.intensity as Intensity | null };
  }
  return week;
}

export function rowToOverride(r: OverrideRow): TrainingOverride {
  return { date: r.date, trains: r.trains, time: normalizeTime(r.time), intensity: r.intensity as Intensity | null };
}

export function rowToStage(r: StageRow): Stage {
  return {
    id: r.id,
    name: r.name,
    startDate: r.start_date,
    endDate: r.end_date,
    goal: r.goal as Goal,
    mode: r.mode as 'auto' | 'manual',
    notes: r.notes,
    createdAt: r.created_at,
    proteinGPerKg: Number(r.protein_g_per_kg),
    carbsTrainingGPerKg: Number(r.carbs_training_g_per_kg),
    carbsRestGPerKg: Number(r.carbs_rest_g_per_kg),
    fatGPerKg: Number(r.fat_g_per_kg),
  };
}

export function rowToFood(r: FoodRow): Food {
  return {
    id: r.id,
    ownerId: r.owner_id,
    overridesFoodId: r.overrides_food_id,
    name: r.name,
    category: r.category,
    source: r.source as FoodSource,
    kcal: Number(r.kcal_100),
    protein: Number(r.protein_100),
    carbs: Number(r.carbs_100),
    fat: Number(r.fat_100),
    fiber: Number(r.fiber_100),
  };
}

export const FOOD_COLUMNS = 'id, owner_id, overrides_food_id, name, category, source, kcal_100, protein_100, carbs_100, fat_100, fiber_100';

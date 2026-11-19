import { bmrMifflin, tdee } from './energy';
import type { ActivityLevel, Goal, ISODate, Sex, Stage, StageRules } from './types';

const GOAL_PARAMS: Record<Goal, { protein: number; fat: number; kcalFactor: number }> = {
  cut: { protein: 2.2, fat: 1.0, kcalFactor: 0.8 },
  maintain: { protein: 1.8, fat: 1.0, kcalFactor: 1.0 },
  bulk: { protein: 1.8, fat: 1.0, kcalFactor: 1.1 },
};

/** Piso de carbohidratos base (g/kg) para que el cálculo automático nunca dé valores absurdos. */
const MIN_CARBS_G_PER_KG = 1.0;
const TRAINING_CARB_FACTOR = 1.1;
const REST_CARB_FACTOR = 0.9;

const round1 = (n: number) => Math.round(n * 10) / 10;

export function autoStageRules(input: {
  sex: Sex;
  weightKg: number;
  heightCm: number;
  ageYears: number;
  activity: ActivityLevel;
  goal: Goal;
}): StageRules {
  const { sex, weightKg: w, heightCm, ageYears, activity, goal } = input;
  const p = GOAL_PARAMS[goal];
  const targetKcal = tdee(bmrMifflin(sex, w, heightCm, ageYears), activity) * p.kcalFactor;
  const carbsBase = Math.max(MIN_CARBS_G_PER_KG, (targetKcal - 4 * p.protein * w - 9 * p.fat * w) / 4 / w);
  return {
    proteinGPerKg: p.protein,
    fatGPerKg: p.fat,
    carbsTrainingGPerKg: round1(carbsBase * TRAINING_CARB_FACTOR),
    carbsRestGPerKg: round1(carbsBase * REST_CARB_FACTOR),
  };
}

/**
 * Etapa vigente en la fecha: la de inicio más reciente entre las que cubren esa fecha;
 * si dos empiezan el mismo día, gana la creada más tarde.
 */
export function activeStage(stages: Stage[], date: ISODate): Stage | null {
  const current = stages.filter((s) => s.startDate <= date && (s.endDate === null || s.endDate >= date));
  if (current.length === 0) return null;
  const newer = (a: Stage, b: Stage) =>
    b.startDate > a.startDate || (b.startDate === a.startDate && Date.parse(b.createdAt) > Date.parse(a.createdAt));
  return current.reduce((a, b) => (newer(a, b) ? b : a));
}

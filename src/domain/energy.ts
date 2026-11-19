import type { ActivityLevel, Sex } from './types';

/** Tasa metabólica basal (Mifflin-St Jeor), en kcal/día. */
export function bmrMifflin(sex: Sex, weightKg: number, heightCm: number, ageYears: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return sex === 'male' ? base + 5 : base - 161;
}

const ACTIVITY_FACTOR: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725,
  very_high: 1.9,
};

/** Gasto energético total diario estimado. */
export function tdee(bmr: number, activity: ActivityLevel): number {
  return bmr * ACTIVITY_FACTOR[activity];
}

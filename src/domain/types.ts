/** Fecha calendario local en formato YYYY-MM-DD. */
export type ISODate = string;

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Sex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'high' | 'very_high';
export type Goal = 'cut' | 'maintain' | 'bulk';

/** Reglas de una etapa en gramos por kg de peso corporal. */
export interface StageRules {
  proteinGPerKg: number;
  carbsTrainingGPerKg: number;
  carbsRestGPerKg: number;
  fatGPerKg: number;
}

export interface Stage extends StageRules {
  id: string;
  name: string;
  startDate: ISODate;
  endDate: ISODate | null;
  goal: Goal;
  mode: 'auto' | 'manual';
  notes: string | null;
}

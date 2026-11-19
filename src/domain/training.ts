import { weekdayOf } from './dates';
import type { DayType, ISODate, TrainingDay, TrainingOverride, TrainingWeek } from './types';

/** Entrenamiento de una fecha: el override de esa fecha gana sobre la semana tipo. */
export function resolveTrainingDay(week: TrainingWeek, overrides: TrainingOverride[], date: ISODate): TrainingDay {
  const override = overrides.find((o) => o.date === date);
  if (override) return { trains: override.trains, time: override.time, intensity: override.intensity };
  return week[weekdayOf(date)];
}

export function dayTypeOf(day: TrainingDay): DayType {
  return day.trains ? 'training' : 'rest';
}

import { expect, test } from 'vitest';
import { dayTypeOf, resolveTrainingDay } from '@/domain/training';
import type { TrainingDay, TrainingWeek } from '@/domain/types';

const rest: TrainingDay = { trains: false, time: null, intensity: null };
const gym: TrainingDay = { trains: true, time: '19:00', intensity: 'high' };
const week: TrainingWeek = { 0: rest, 1: gym, 2: rest, 3: gym, 4: rest, 5: gym, 6: rest };

test('sin override usa la semana tipo (miércoles entrena)', () => {
  expect(resolveTrainingDay(week, [], '2026-11-18')).toEqual(gym);
  expect(dayTypeOf(resolveTrainingDay(week, [], '2026-11-18'))).toBe('training');
});

test('override de esa fecha gana sobre la semana tipo', () => {
  const day = resolveTrainingDay(week, [{ date: '2026-11-18', ...rest }], '2026-11-18');
  expect(dayTypeOf(day)).toBe('rest');
});

test('override de otra fecha no afecta', () => {
  const day = resolveTrainingDay(week, [{ date: '2026-11-19', ...rest }], '2026-11-18');
  expect(dayTypeOf(day)).toBe('training');
});

import { expect, test } from 'vitest';
import { bmrMifflin, tdee } from '@/domain/energy';

test('TMB hombre 30 años 80 kg 180 cm', () => {
  expect(bmrMifflin('male', 80, 180, 30)).toBe(1780);
});

test('TMB mujer resta 161', () => {
  expect(bmrMifflin('female', 60, 165, 30)).toBe(1320.25);
});

test('gasto total con actividad moderada', () => {
  expect(tdee(1780, 'moderate')).toBeCloseTo(2759, 0);
});

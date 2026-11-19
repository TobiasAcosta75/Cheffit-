import { expect, test } from 'vitest';
import { macrosForGrams } from '@/domain/foods';

const pechuga = { kcal: 120, protein: 22.5, carbs: 0, fat: 2.6, fiber: 0 };

test('macrosForGrams pechuga 150 g', () => {
  expect(macrosForGrams(pechuga, 150)).toEqual({ proteinG: 33.8, carbsG: 0, fatG: 3.9, kcal: 180 });
});

test('macrosForGrams 0 g da cero', () => {
  expect(macrosForGrams(pechuga, 0)).toEqual({ proteinG: 0, carbsG: 0, fatG: 0, kcal: 0 });
});

import { describe, expect, test } from 'vitest';
import { buildMealLog } from '@/app/(app)/registro/meal-log';
import { logMealSchema } from '@/app/(app)/registro/schema';
import type { Food } from '@/domain/types';

const pechuga = (): Food => ({
  id: '11111111-1111-4111-8111-111111111111',
  ownerId: null,
  overridesFoodId: null,
  name: 'Pechuga de pollo',
  category: 'carnes',
  source: 'usda',
  kcal: 120,
  protein: 22.5,
  carbs: 0,
  fat: 2.6,
  fiber: 0,
});

describe('buildMealLog', () => {
  test('guarda nombre y snapshot de macros', () => {
    const log = buildMealLog(pechuga(), 150, 'lunch', '2026-11-18');
    expect(log).toEqual({
      date: '2026-11-18',
      slot: 'lunch',
      food_id: '11111111-1111-4111-8111-111111111111',
      food_name: 'Pechuga de pollo',
      grams: 150,
      protein_g: 33.8,
      carbs_g: 0,
      fat_g: 3.9,
      kcal: 180,
    });
  });

  test('el snapshot no cambia si el alimento cambia después', () => {
    const food = pechuga();
    const log = buildMealLog(food, 150, 'lunch', '2026-11-18');
    food.protein = 30;
    expect(log.protein_g).toBe(33.8);
  });
});

describe('logMealSchema', () => {
  const base = { foodId: '11111111-1111-4111-8111-111111111111', grams: 150, slot: 'lunch' };

  test('acepta un registro válido', () => {
    expect(logMealSchema.safeParse(base).success).toBe(true);
  });

  test('rechaza 0 gramos', () => {
    expect(logMealSchema.safeParse({ ...base, grams: 0 }).success).toBe(false);
  });

  test('rechaza más de 5000 gramos', () => {
    expect(logMealSchema.safeParse({ ...base, grams: 5001 }).success).toBe(false);
  });

  test('rechaza un momento del día inexistente', () => {
    expect(logMealSchema.safeParse({ ...base, slot: 'brunch' }).success).toBe(false);
  });
});

import type { FoodPer100, Macros } from './types';

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Macros de una cantidad en gramos de un alimento (gramos a 1 decimal, kcal entera). */
export function macrosForGrams(food: FoodPer100, grams: number): Macros {
  const f = grams / 100;
  return {
    proteinG: round1(food.protein * f),
    carbsG: round1(food.carbs * f),
    fatG: round1(food.fat * f),
    kcal: Math.round(food.kcal * f),
  };
}

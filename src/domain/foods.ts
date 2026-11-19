import type { Food, FoodPer100, Macros } from './types';

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

/** Texto normalizado para búsqueda: sin tildes, minúsculas, espacios colapsados. */
export function normalizeForSearch(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Alimentos visibles para un usuario: globales + propios, donde una copia propia
 * de un global reemplaza a ese global.
 */
export function resolveOverrides<T extends Pick<Food, 'id' | 'ownerId' | 'overridesFoodId'>>(foods: T[], userId: string): T[] {
  const visible = foods.filter((f) => f.ownerId === null || f.ownerId === userId);
  const overridden = new Set(visible.filter((f) => f.ownerId === userId && f.overridesFoodId).map((f) => f.overridesFoodId));
  return visible.filter((f) => !(f.ownerId === null && overridden.has(f.id)));
}

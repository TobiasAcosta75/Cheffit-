import { macrosForGrams } from '@/domain/foods';
import type { Food, ISODate, Slot } from '@/domain/types';

export interface MealLogInsert {
  date: ISODate;
  slot: Slot;
  food_id: string;
  food_name: string;
  grams: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  kcal: number;
}

/** Fila de registro con el snapshot de macros del momento (no cambia si después se edita el alimento). */
export function buildMealLog(food: Food, grams: number, slot: Slot, date: ISODate): MealLogInsert {
  const m = macrosForGrams(food, grams);
  return {
    date,
    slot,
    food_id: food.id,
    food_name: food.name,
    grams,
    protein_g: m.proteinG,
    carbs_g: m.carbsG,
    fat_g: m.fatG,
    kcal: m.kcal,
  };
}

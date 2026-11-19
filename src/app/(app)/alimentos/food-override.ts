import { z } from 'zod';
import { normalizeForSearch } from '@/domain/foods';
import type { Food, FoodPer100 } from '@/domain/types';

const per100 = (label: string) => z.number({ message: `Ingresá ${label}` }).min(0, 'No puede ser negativo').max(100, 'Máximo 100 g');

/** Formulario de alimento (valores por 100 g). */
export const foodFormSchema = z
  .object({
    name: z.string().trim().min(2, 'Poné un nombre').max(80),
    category: z.string().trim().min(1).max(40),
    kcal: z.number({ message: 'Ingresá las calorías' }).min(0, 'No puede ser negativo').max(900, 'Máximo 900 kcal'),
    protein: per100('las proteínas'),
    carbs: per100('los carbohidratos'),
    fat: per100('las grasas'),
    fiber: per100('la fibra'),
  })
  .refine((f) => f.protein + f.carbs + f.fat <= 100, { message: 'Proteínas + carbos + grasas no pueden superar 100 g', path: ['protein'] });

export type FoodForm = z.infer<typeof foodFormSchema>;

export interface FoodInsert {
  owner_id: string;
  overrides_food_id: string | null;
  name: string;
  search_name: string;
  category: string;
  source: 'user';
  kcal_100: number;
  protein_100: number;
  carbs_100: number;
  fat_100: number;
  fiber_100: number;
}

/** Copia personal de un alimento global con los cambios del usuario (solo la ve su dueño). */
export function buildOverride(global: Food, changes: Partial<FoodPer100 & { name: string }>, userId: string): FoodInsert {
  const merged = { ...global, ...changes };
  return {
    owner_id: userId,
    overrides_food_id: global.id,
    name: merged.name,
    search_name: normalizeForSearch(merged.name),
    category: global.category,
    source: 'user',
    kcal_100: merged.kcal,
    protein_100: merged.protein,
    carbs_100: merged.carbs,
    fat_100: merged.fat,
    fiber_100: merged.fiber,
  };
}

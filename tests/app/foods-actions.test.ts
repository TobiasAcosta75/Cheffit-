import { describe, expect, test } from 'vitest';
import { buildOverride, foodFormSchema } from '@/app/(app)/alimentos/food-override';
import { normalizeForSearch } from '@/domain/foods';
import type { Food } from '@/domain/types';

const global: Food = {
  id: '22222222-2222-4222-8222-222222222222',
  ownerId: null,
  overridesFoodId: null,
  name: 'Merluza / pescado blanco (crudo)',
  category: 'pescados',
  source: 'usda',
  kcal: 90,
  protein: 18.3,
  carbs: 0,
  fat: 1.3,
  fiber: 0,
};

describe('buildOverride', () => {
  test('copia el global y aplica los cambios', () => {
    const o = buildOverride(global, { protein: 17 }, 'userA');
    expect(o).toEqual({
      owner_id: 'userA',
      overrides_food_id: global.id,
      name: global.name,
      search_name: normalizeForSearch(global.name),
      category: 'pescados',
      source: 'user',
      kcal_100: 90,
      protein_100: 17,
      carbs_100: 0,
      fat_100: 1.3,
      fiber_100: 0,
    });
  });

  test('un cambio de nombre actualiza también el nombre de búsqueda', () => {
    const o = buildOverride(global, { name: 'Merluza argentina' }, 'userA');
    expect(o.search_name).toBe('merluza argentina');
  });
});

describe('foodFormSchema', () => {
  const valid = { name: 'Queso cremoso', category: 'lacteos', kcal: 300, protein: 20, carbs: 2, fat: 24, fiber: 0 };

  test('acepta un alimento válido', () => {
    expect(foodFormSchema.safeParse(valid).success).toBe(true);
  });

  test('rechaza macros negativos', () => {
    expect(foodFormSchema.safeParse({ ...valid, protein: -1 }).success).toBe(false);
  });

  test('rechaza más de 100 g de macros en 100 g', () => {
    expect(foodFormSchema.safeParse({ ...valid, protein: 60, carbs: 30, fat: 20 }).success).toBe(false);
  });
});

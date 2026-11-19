import { expect, test } from 'vitest';
import { macrosForGrams } from '@/domain/foods';

const pechuga = { kcal: 120, protein: 22.5, carbs: 0, fat: 2.6, fiber: 0 };

test('macrosForGrams pechuga 150 g', () => {
  expect(macrosForGrams(pechuga, 150)).toEqual({ proteinG: 33.8, carbsG: 0, fatG: 3.9, kcal: 180 });
});

test('macrosForGrams 0 g da cero', () => {
  expect(macrosForGrams(pechuga, 0)).toEqual({ proteinG: 0, carbsG: 0, fatG: 0, kcal: 0 });
});

import { normalizeForSearch, resolveOverrides } from '@/domain/foods';
import type { Food } from '@/domain/types';

test('normalizeForSearch quita tildes, mayúsculas y espacios', () => {
  expect(normalizeForSearch('  Limón  Sutil ')).toBe('limon sutil');
  expect(normalizeForSearch('ÑOQUIS')).toBe('noquis');
});

function food(over: Partial<Food>): Food {
  return {
    id: 'x', ownerId: null, overridesFoodId: null, name: 'Pechuga', category: 'carnes', source: 'usda',
    kcal: 120, protein: 22.5, carbs: 0, fat: 2.6, fiber: 0, ...over,
  };
}

test('resolveOverrides oculta el global reemplazado solo para su dueño', () => {
  const global = food({ id: 'g1' });
  const copia = food({ id: 'u1', ownerId: 'userA', overridesFoodId: 'g1', source: 'user' });
  const otro = food({ id: 'g2' });
  expect(resolveOverrides([global, copia, otro], 'userA').map((f) => f.id)).toEqual(['u1', 'g2']);
  expect(resolveOverrides([global, otro], 'userB').map((f) => f.id)).toEqual(['g1', 'g2']);
});

test('resolveOverrides ignora copias de otros usuarios', () => {
  const global = food({ id: 'g1' });
  const copiaAjena = food({ id: 'u9', ownerId: 'userZ', overridesFoodId: 'g1' });
  expect(resolveOverrides([global, copiaAjena], 'userA').map((f) => f.id)).toEqual(['g1']);
});

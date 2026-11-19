import { describe, expect, test } from 'vitest';
import { rowToFood, rowToStage, rowsToTrainingWeek, normalizeTime } from '@/lib/mappers';

describe('normalizeTime', () => {
  test('recorta los segundos que devuelve Postgres', () => {
    expect(normalizeTime('19:00:00')).toBe('19:00');
    expect(normalizeTime('07:30')).toBe('07:30');
    expect(normalizeTime(null)).toBeNull();
  });
});

describe('rowsToTrainingWeek', () => {
  test('días sin fila quedan como descanso', () => {
    const week = rowsToTrainingWeek([{ weekday: 3, trains: true, time: '19:00:00', intensity: 'high' }]);
    expect(week[3]).toEqual({ trains: true, time: '19:00', intensity: 'high' });
    expect(week[0]).toEqual({ trains: false, time: null, intensity: null });
    expect(Object.keys(week)).toHaveLength(7);
  });
});

describe('rowToStage', () => {
  test('convierte numéricos que llegan como string', () => {
    const stage = rowToStage({
      id: 's1',
      name: 'Etapa 3',
      start_date: '2026-11-18',
      end_date: null,
      goal: 'cut',
      mode: 'manual',
      notes: null,
      protein_g_per_kg: '2.2' as unknown as number,
      carbs_training_g_per_kg: 1.8,
      carbs_rest_g_per_kg: 1.5,
      fat_g_per_kg: 1,
    });
    expect(stage).toMatchObject({ id: 's1', startDate: '2026-11-18', endDate: null, proteinGPerKg: 2.2, carbsRestGPerKg: 1.5 });
  });
});

describe('rowToFood', () => {
  test('mapea columnas por 100 g', () => {
    const food = rowToFood({
      id: 'f1',
      owner_id: null,
      overrides_food_id: null,
      name: 'Limón',
      category: 'frutas',
      source: 'usda',
      kcal_100: 29,
      protein_100: 1.1,
      carbs_100: 9.3,
      fat_100: 0.3,
      fiber_100: 2.8,
    });
    expect(food).toEqual({
      id: 'f1', ownerId: null, overridesFoodId: null, name: 'Limón', category: 'frutas', source: 'usda',
      kcal: 29, protein: 1.1, carbs: 9.3, fat: 0.3, fiber: 2.8,
    });
  });
});

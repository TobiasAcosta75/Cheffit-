import { describe, expect, test } from 'vitest';
import { fdcToFood, parseFoodMap, toSeedSql, type FdcFood, type FoodMapRow } from '../../scripts/build-food-seed';

const row: FoodMapRow = {
  name: 'Pechuga de pollo (cruda)',
  category: 'carnes',
  fdcId: 171077,
  manual: null,
  source: 'usda',
  measures: [{ label: '1 pechuga mediana', grams: 174 }],
};

function fdcWith(nutrients: Record<number, number>): FdcFood {
  return { fdcId: 171077, description: 'Chicken breast', nutrients };
}

describe('fdcToFood', () => {
  test('usa energía 1008 cuando existe', () => {
    const f = fdcToFood(fdcWith({ 1003: 22.5, 1004: 2.6, 1005: 0, 1008: 120, 1079: 0 }), row);
    expect(f).toMatchObject({
      name: 'Pechuga de pollo (cruda)',
      searchName: 'pechuga de pollo (cruda)',
      kcal: 120,
      protein: 22.5,
      carbs: 0,
      fat: 2.6,
      fiber: 0,
      source: 'usda',
      sourceRef: 'fdc:171077',
    });
  });

  test('cae a 2047 cuando falta 1008', () => {
    expect(fdcToFood(fdcWith({ 1003: 10, 1004: 5, 1005: 20, 2047: 170 }), row).kcal).toBe(170);
  });

  test('cae a 2048 cuando faltan 1008 y 2047', () => {
    expect(fdcToFood(fdcWith({ 1003: 10, 1004: 5, 1005: 20, 2048: 168 }), row).kcal).toBe(168);
  });

  test('calcula Atwater si no hay energía', () => {
    expect(fdcToFood(fdcWith({ 1003: 10, 1004: 5, 1005: 20 }), row).kcal).toBe(165);
  });

  test('nutriente faltante cuenta como 0 (fibra)', () => {
    expect(fdcToFood(fdcWith({ 1003: 10, 1004: 5, 1005: 20, 1008: 165 }), row).fiber).toBe(0);
  });
});

describe('parseFoodMap', () => {
  test('lee filas USDA y manuales con medidas', () => {
    const csv = [
      'name,category,fdc_id,kcal_100,protein_100,carbs_100,fat_100,fiber_100,source,measures',
      'Huevo entero,huevos,171287,,,,,,usda,1 huevo grande:50|1 huevo extra grande:56',
      'Alimento manual,otros,,100,10,5,2,1,manual,',
    ].join('\n');
    const rows = parseFoodMap(csv);
    expect(rows[0]).toEqual({
      name: 'Huevo entero', category: 'huevos', fdcId: 171287, manual: null, source: 'usda',
      measures: [{ label: '1 huevo grande', grams: 50 }, { label: '1 huevo extra grande', grams: 56 }],
    });
    expect(rows[1]).toEqual({
      name: 'Alimento manual', category: 'otros', fdcId: null, source: 'manual', measures: [],
      manual: { kcal: 100, protein: 10, carbs: 5, fat: 2, fiber: 1 },
    });
  });

  test('rechaza una fila sin fdc_id ni macros manuales', () => {
    const csv = 'name,category,fdc_id,kcal_100,protein_100,carbs_100,fat_100,fiber_100,source,measures\nX,otros,,,,,,,manual,';
    expect(() => parseFoodMap(csv)).toThrow(/X/);
  });
});

describe('toSeedSql', () => {
  test('escapa comillas simples', () => {
    const seed = { ...fdcToFood(fdcWith({ 1003: 8, 1004: 1, 1005: 50, 1008: 250 }), row), name: "Pan d'agua", searchName: "pan d'agua" };
    expect(toSeedSql([seed])).toContain("'Pan d''agua'");
  });

  test('inserta medidas caseras ligadas al alimento', () => {
    const sql = toSeedSql([fdcToFood(fdcWith({ 1003: 22.5, 1004: 2.6, 1005: 0, 1008: 120 }), row)]);
    expect(sql).toContain('insert into public.household_measures');
    expect(sql).toContain("'1 pechuga mediana', 174");
  });
});

import { expect, test } from 'vitest';
import { dayTargets, remaining, sumMacros } from '@/domain/targets';

const etapa3 = { proteinGPerKg: 2.2, carbsTrainingGPerKg: 1.8, carbsRestGPerKg: 1.5, fatGPerKg: 1.0 };

test('Etapa 3, 80 kg, día de entreno', () => {
  expect(dayTargets(etapa3, 80, 'training')).toEqual({ proteinG: 176, carbsG: 144, fatG: 80, kcal: 2000 });
});

test('Etapa 3, 80 kg, descanso', () => {
  expect(dayTargets(etapa3, 80, 'rest')).toEqual({ proteinG: 176, carbsG: 120, fatG: 80, kcal: 1904 });
});

test('redondea gramos antes de calcular kcal', () => {
  // 2.2 × 73.5 = 161.7 → 162; 1.8 × 73.5 = 132.3 → 132; 1 × 73.5 = 73.5 → 74
  expect(dayTargets(etapa3, 73.5, 'training')).toEqual({ proteinG: 162, carbsG: 132, fatG: 74, kcal: 4 * 162 + 4 * 132 + 9 * 74 });
});

test('sumMacros suma y remaining marca excedido en negativo', () => {
  const consumed = sumMacros([
    { proteinG: 100, carbsG: 50, fatG: 30, kcal: 870 },
    { proteinG: 80, carbsG: 50, fatG: 30, kcal: 790 },
  ]);
  expect(consumed).toEqual({ proteinG: 180, carbsG: 100, fatG: 60, kcal: 1660 });
  expect(remaining({ proteinG: 176, carbsG: 144, fatG: 80, kcal: 2000 }, consumed)).toEqual({
    proteinG: -4, carbsG: 44, fatG: 20, kcal: 340,
  });
});

test('sumMacros de lista vacía es cero', () => {
  expect(sumMacros([])).toEqual({ proteinG: 0, carbsG: 0, fatG: 0, kcal: 0 });
});

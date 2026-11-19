import { describe, expect, test } from 'vitest';
import { activeStage, autoStageRules } from '@/domain/stages';
import type { Stage } from '@/domain/types';

describe('autoStageRules', () => {
  test('definición hombre 80 kg moderado', () => {
    expect(
      autoStageRules({ sex: 'male', weightKg: 80, heightCm: 180, ageYears: 30, activity: 'moderate', goal: 'cut' }),
    ).toEqual({ proteinGPerKg: 2.2, fatGPerKg: 1.0, carbsTrainingGPerKg: 2.7, carbsRestGPerKg: 2.2 });
  });

  test('piso de 1,0 g/kg de carbos con gasto bajo', () => {
    const r = autoStageRules({ sex: 'female', weightKg: 140, heightCm: 155, ageYears: 60, activity: 'sedentary', goal: 'cut' });
    expect(r.carbsRestGPerKg).toBe(0.9);
    expect(r.carbsTrainingGPerKg).toBe(1.1);
  });

  test('volumen usa proteína 1,8 y más carbos que mantenimiento', () => {
    const base = { sex: 'male' as const, weightKg: 80, heightCm: 180, ageYears: 30, activity: 'moderate' as const };
    const maintain = autoStageRules({ ...base, goal: 'maintain' });
    const bulk = autoStageRules({ ...base, goal: 'bulk' });
    expect(bulk.proteinGPerKg).toBe(1.8);
    expect(bulk.carbsTrainingGPerKg).toBeGreaterThan(maintain.carbsTrainingGPerKg);
  });
});

function stage(id: string, startDate: string, endDate: string | null = null): Stage {
  return {
    id, name: id, startDate, endDate, goal: 'cut', mode: 'manual', notes: null,
    proteinGPerKg: 2.2, carbsTrainingGPerKg: 1.8, carbsRestGPerKg: 1.5, fatGPerKg: 1,
  };
}

describe('activeStage', () => {
  const A = stage('A', '2026-09-01');
  const B = stage('B', '2026-11-01');
  const C = stage('C', '2026-12-01');

  test('elige la vigente más reciente', () => {
    expect(activeStage([A, B, C], '2026-11-18')?.id).toBe('B');
  });
  test('ninguna vigente', () => {
    expect(activeStage([C], '2026-11-18')).toBeNull();
  });
  test('etapa cerrada no cuenta', () => {
    expect(activeStage([A, stage('D', '2026-10-01', '2026-11-10')], '2026-11-18')?.id).toBe('A');
  });
});

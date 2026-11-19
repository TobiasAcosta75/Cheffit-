import { describe, expect, test } from 'vitest';
import { buildOnboardingSchema, type OnboardingInput } from '@/app/onboarding/schema';

const TODAY = '2026-11-18';
const schema = buildOnboardingSchema(TODAY);

const rest = { trains: false, time: null, intensity: null };
const gym = { trains: true, time: '19:00', intensity: 'high' as const };

const valid: OnboardingInput = {
  displayName: 'Tobi',
  sex: 'male',
  birthDate: '1996-05-10',
  heightCm: 180,
  weightKg: 80,
  activity: 'moderate',
  goal: 'cut',
  mealSlots: ['breakfast', 'lunch', 'snack', 'dinner'],
  avoidedFoods: [],
  restrictions: [],
  maxCookMinutes: 20,
  week: [rest, gym, rest, gym, rest, gym, rest],
  stage: {
    mode: 'manual',
    name: 'Etapa 3 - pulido de la definición',
    proteinGPerKg: 2.2,
    carbsTrainingGPerKg: 1.8,
    carbsRestGPerKg: 1.5,
    fatGPerKg: 1.0,
    notes: 'Déficit calórico fuerte',
  },
};

const errorPaths = (input: unknown) => {
  const r = schema.safeParse(input);
  return r.success ? [] : r.error.issues.map((i) => i.path.join('.'));
};

describe('onboardingSchema', () => {
  test('acepta la Etapa 3 manual', () => {
    expect(schema.safeParse(valid).success).toBe(true);
  });

  test('rechaza peso fuera de rango', () => {
    expect(errorPaths({ ...valid, weightKg: 20 })).toContain('weightKg');
  });

  test('rechaza altura fuera de rango', () => {
    expect(errorPaths({ ...valid, heightCm: 260 })).toContain('heightCm');
  });

  test('rechaza menores de 16 años', () => {
    expect(errorPaths({ ...valid, birthDate: '2011-01-01' })).toContain('birthDate');
  });

  test('día de entreno sin hora es inválido', () => {
    const week = [...valid.week];
    week[1] = { trains: true, time: null, intensity: 'high' };
    expect(errorPaths({ ...valid, week })).toContain('week.1.time');
  });

  test('exige al menos una comida', () => {
    expect(errorPaths({ ...valid, mealSlots: [] })).toContain('mealSlots');
  });

  test('exige los 7 días de la semana', () => {
    expect(errorPaths({ ...valid, week: valid.week.slice(0, 6) })).toContain('week');
  });

  test('rechaza reglas g/kg fuera de 0–5', () => {
    expect(errorPaths({ ...valid, stage: { ...valid.stage, proteinGPerKg: 7 } })).toContain('stage.proteinGPerKg');
  });
});

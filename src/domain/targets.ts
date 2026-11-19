import type { DayType, Macros, StageRules } from './types';

export function kcalOf(proteinG: number, carbsG: number, fatG: number): number {
  return 4 * proteinG + 4 * carbsG + 9 * fatG;
}

/** Macros objetivo del día: regla g/kg × peso de referencia, gramos enteros. */
export function dayTargets(rules: StageRules, referenceWeightKg: number, dayType: DayType): Macros {
  const carbsPerKg = dayType === 'training' ? rules.carbsTrainingGPerKg : rules.carbsRestGPerKg;
  const proteinG = Math.round(rules.proteinGPerKg * referenceWeightKg);
  const carbsG = Math.round(carbsPerKg * referenceWeightKg);
  const fatG = Math.round(rules.fatGPerKg * referenceWeightKg);
  return { proteinG, carbsG, fatG, kcal: kcalOf(proteinG, carbsG, fatG) };
}

const round1 = (n: number) => Math.round(n * 10) / 10;

export function sumMacros(items: Macros[]): Macros {
  const total = items.reduce(
    (acc, m) => ({
      proteinG: acc.proteinG + m.proteinG,
      carbsG: acc.carbsG + m.carbsG,
      fatG: acc.fatG + m.fatG,
      kcal: acc.kcal + m.kcal,
    }),
    { proteinG: 0, carbsG: 0, fatG: 0, kcal: 0 },
  );
  return { proteinG: round1(total.proteinG), carbsG: round1(total.carbsG), fatG: round1(total.fatG), kcal: Math.round(total.kcal) };
}

/** Lo que falta para el objetivo; negativo = excedido. */
export function remaining(target: Macros, consumed: Macros): Macros {
  return {
    proteinG: round1(target.proteinG - consumed.proteinG),
    carbsG: round1(target.carbsG - consumed.carbsG),
    fatG: round1(target.fatG - consumed.fatG),
    kcal: Math.round(target.kcal - consumed.kcal),
  };
}

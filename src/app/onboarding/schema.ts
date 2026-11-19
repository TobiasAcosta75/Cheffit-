import { z } from 'zod';
import { ageOn } from '@/domain/dates';
import type { ISODate } from '@/domain/types';
import {
  activitySchema,
  goalSchema,
  isoDateSchema,
  slotSchema,
  stageInputSchema,
  trainingDaySchema,
  weightKgSchema,
} from '@/lib/validation';

const MIN_AGE = 16;

/** Esquema del onboarding; `today` (fecha local del usuario) define la validación de edad. */
export function buildOnboardingSchema(today: ISODate) {
  return z.object({
    displayName: z.string().trim().max(60).optional(),
    sex: z.enum(['male', 'female'], { message: 'Elegí una opción' }),
    birthDate: isoDateSchema.refine((d) => d <= today && ageOn(d, today) >= MIN_AGE, `Tenés que tener al menos ${MIN_AGE} años`),
    heightCm: z.number({ message: 'Ingresá tu altura' }).min(120, 'Mínimo 120 cm').max(230, 'Máximo 230 cm'),
    weightKg: weightKgSchema,
    activity: activitySchema,
    goal: goalSchema,
    mealSlots: z.array(slotSchema).min(1, 'Elegí al menos una comida'),
    avoidedFoods: z.array(z.string().trim().min(1).max(60)).max(50),
    restrictions: z.array(z.string().trim().min(1).max(60)).max(20),
    maxCookMinutes: z.number().int().min(5, 'Mínimo 5 minutos').max(240).nullable(),
    week: z.array(trainingDaySchema).length(7, 'Faltan días de la semana'),
    stage: stageInputSchema,
  });
}

export type OnboardingInput = z.input<ReturnType<typeof buildOnboardingSchema>>;
export type OnboardingData = z.output<ReturnType<typeof buildOnboardingSchema>>;

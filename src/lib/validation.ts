import { z } from 'zod';
import { SLOTS } from '@/domain/types';

/** Esquemas compartidos entre onboarding, etapas y entreno. */

export const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida');

export const slotSchema = z.enum(SLOTS);

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Hora inválida (HH:MM)');

export const trainingDaySchema = z
  .object({
    trains: z.boolean(),
    time: timeSchema.nullable(),
    intensity: z.enum(['low', 'medium', 'high']).nullable(),
  })
  .superRefine((d, ctx) => {
    if (d.trains && !d.time) ctx.addIssue({ code: 'custom', path: ['time'], message: 'Indicá a qué hora entrenás' });
  })
  .transform((d) => (d.trains ? d : { trains: false, time: null, intensity: null }));

const gPerKg = z.number({ message: 'Ingresá un número' }).min(0, 'Mínimo 0').max(5, 'Máximo 5 g/kg');

export const stageRulesSchema = z.object({
  proteinGPerKg: gPerKg,
  carbsTrainingGPerKg: gPerKg,
  carbsRestGPerKg: gPerKg,
  fatGPerKg: gPerKg,
});

export const stageInputSchema = stageRulesSchema.extend({
  mode: z.enum(['auto', 'manual']),
  name: z.string().trim().min(1, 'Poné un nombre a la etapa').max(80),
  notes: z.string().trim().max(500).nullable().optional(),
});

export const goalSchema = z.enum(['cut', 'maintain', 'bulk']);
export const activitySchema = z.enum(['sedentary', 'light', 'moderate', 'high', 'very_high']);
export const weightKgSchema = z.number({ message: 'Ingresá tu peso' }).min(30, 'Mínimo 30 kg').max(300, 'Máximo 300 kg');

/** Mensaje del primer error para cada campo (clave = path con puntos). */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || '_';
    out[key] ??= issue.message;
  }
  return out;
}

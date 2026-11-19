import { z } from 'zod';
import { goalSchema, isoDateSchema, stageInputSchema } from '@/lib/validation';

export const stageFormSchema = stageInputSchema
  .extend({
    id: z.uuid().optional(),
    goal: goalSchema,
    startDate: isoDateSchema,
    endDate: isoDateSchema.nullable(),
  })
  .refine((s) => s.endDate === null || s.endDate >= s.startDate, { message: 'El fin no puede ser antes del inicio', path: ['endDate'] });

export type StageFormInput = z.input<typeof stageFormSchema>;

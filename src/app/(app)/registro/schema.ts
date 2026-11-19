import { z } from 'zod';
import { slotSchema } from '@/lib/validation';

export const gramsSchema = z.number({ message: 'Ingresá los gramos' }).gt(0, 'Tiene que ser más de 0 g').max(5000, 'Máximo 5000 g');

export const logMealSchema = z.object({
  foodId: z.uuid(),
  grams: gramsSchema,
  slot: slotSchema,
});

export const updateMealGramsSchema = z.object({
  id: z.uuid(),
  grams: gramsSchema,
});

export type LogMealInput = z.infer<typeof logMealSchema>;

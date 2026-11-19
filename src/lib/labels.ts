import type { ActivityLevel, Goal, Intensity, Slot } from '@/domain/types';

export const SLOT_LABELS: Record<Slot, string> = {
  breakfast: 'Desayuno',
  lunch: 'Almuerzo',
  snack: 'Merienda',
  dinner: 'Cena',
  pre_workout: 'Pre entreno',
  post_workout: 'Post entreno',
  extra: 'Colación',
};

export const GOAL_LABELS: Record<Goal, string> = {
  cut: 'Definición',
  maintain: 'Mantenimiento',
  bulk: 'Volumen',
};

export const ACTIVITY_LABELS: Record<ActivityLevel, { label: string; hint: string }> = {
  sedentary: { label: 'Sedentario', hint: 'Trabajo sentado, casi sin movimiento' },
  light: { label: 'Ligero', hint: 'Entreno 1–3 días por semana' },
  moderate: { label: 'Moderado', hint: 'Entreno 3–5 días por semana' },
  high: { label: 'Alto', hint: 'Entreno 6–7 días por semana' },
  very_high: { label: 'Muy alto', hint: 'Doble turno o trabajo físico intenso' },
};

export const INTENSITY_LABELS: Record<Intensity, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

/** Días en el orden en que se muestran (lunes primero); el valor es el weekday (0 = domingo). */
export const WEEKDAYS_DISPLAY: { weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6; label: string; short: string }[] = [
  { weekday: 1, label: 'Lunes', short: 'Lun' },
  { weekday: 2, label: 'Martes', short: 'Mar' },
  { weekday: 3, label: 'Miércoles', short: 'Mié' },
  { weekday: 4, label: 'Jueves', short: 'Jue' },
  { weekday: 5, label: 'Viernes', short: 'Vie' },
  { weekday: 6, label: 'Sábado', short: 'Sáb' },
  { weekday: 0, label: 'Domingo', short: 'Dom' },
];

export const RESTRICTION_OPTIONS = ['Sin lactosa', 'Sin gluten', 'Vegetariano', 'Vegano'];

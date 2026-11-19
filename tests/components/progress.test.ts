import { expect, test } from 'vitest';
import { progressState } from '@/components/ui/progress';

test('porcentaje dentro del objetivo', () => {
  expect(progressState(120, 176)).toEqual({ percent: 68, exceeded: false });
});

test('excedido se marca y la barra queda llena', () => {
  expect(progressState(180, 176)).toEqual({ percent: 100, exceeded: true });
});

test('objetivo cero no divide por cero', () => {
  expect(progressState(0, 0)).toEqual({ percent: 0, exceeded: false });
});

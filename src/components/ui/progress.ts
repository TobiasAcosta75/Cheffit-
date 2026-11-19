/** Estado visual de una barra de progreso: porcentaje (0–100) y si se pasó del objetivo. */
export function progressState(value: number, target: number): { percent: number; exceeded: boolean } {
  if (target <= 0) return { percent: 0, exceeded: false };
  return { percent: Math.min(100, Math.round((value / target) * 100)), exceeded: value > target };
}

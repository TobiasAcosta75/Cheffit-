import { describe, expect, test } from 'vitest';
import { ageOn, todayIn, weekdayOf } from '@/domain/dates';

describe('todayIn', () => {
  test('noche en Argentina queda en la fecha local', () => {
    expect(todayIn('America/Argentina/Buenos_Aires', new Date('2026-11-19T01:30:00Z'))).toBe('2026-11-18');
  });
  test('mediodía UTC es el mismo día local', () => {
    expect(todayIn('America/Argentina/Buenos_Aires', new Date('2026-11-18T15:00:00Z'))).toBe('2026-11-18');
  });
});

describe('weekdayOf', () => {
  test('miércoles y domingo', () => {
    expect(weekdayOf('2026-11-18')).toBe(3);
    expect(weekdayOf('2026-11-22')).toBe(0);
  });
});

describe('ageOn', () => {
  test('cumple justo ese día', () => {
    expect(ageOn('1996-11-18', '2026-11-18')).toBe(30);
  });
  test('un día antes del cumpleaños', () => {
    expect(ageOn('1996-11-19', '2026-11-18')).toBe(29);
  });
});

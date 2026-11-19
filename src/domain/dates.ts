import type { ISODate, Weekday } from './types';

/** Fecha de "hoy" en la zona horaria indicada (nunca UTC implícito). */
export function todayIn(timeZone: string, now: Date = new Date()): ISODate {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

function parts(date: ISODate): [number, number, number] {
  const [y, m, d] = date.split('-').map(Number);
  return [y, m, d];
}

/** Día de la semana (0 = domingo), independiente de la zona horaria de la máquina. */
export function weekdayOf(date: ISODate): Weekday {
  const [y, m, d] = parts(date);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay() as Weekday;
}

/** Edad en años cumplidos a la fecha indicada. */
export function ageOn(birthDate: ISODate, date: ISODate): number {
  const [by, bm, bd] = parts(birthDate);
  const [y, m, d] = parts(date);
  const hadBirthday = m > bm || (m === bm && d >= bd);
  return y - by - (hadBirthday ? 0 : 1);
}

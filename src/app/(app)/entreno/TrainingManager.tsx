'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { TrainingWeekFields } from '@/components/TrainingWeekFields';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Input';
import { weekdayOf } from '@/domain/dates';
import type { Intensity, ISODate, TrainingDay, TrainingOverride } from '@/domain/types';
import { INTENSITY_LABELS, WEEKDAYS_DISPLAY } from '@/lib/labels';
import { deleteOverride, saveOverride, saveTrainingWeek } from './actions';

const fmtDate = (d: ISODate) => {
  const label = WEEKDAYS_DISPLAY.find((w) => w.weekday === weekdayOf(d))?.short ?? '';
  return `${label} ${d.split('-').reverse().slice(0, 2).join('/')}`;
};

export function TrainingManager({ week: initialWeek, overrides, today }: { week: TrainingDay[]; overrides: TrainingOverride[]; today: ISODate }) {
  const router = useRouter();
  const [week, setWeek] = useState(initialWeek);
  const [weekErrors, setWeekErrors] = useState<Record<string, string>>({});
  const [weekSaved, setWeekSaved] = useState(false);
  const [pending, start] = useTransition();

  const [date, setDate] = useState(today);
  const [trains, setTrains] = useState(false);
  const [time, setTime] = useState('19:00');
  const [intensity, setIntensity] = useState<Intensity>('medium');
  const [overrideError, setOverrideError] = useState<string | null>(null);

  function saveWeek() {
    start(async () => {
      const res = await saveTrainingWeek(week);
      if (res.ok) {
        setWeekErrors({});
        setWeekSaved(true);
        router.refresh();
      } else {
        setWeekErrors(res.errors);
        setWeekSaved(false);
      }
    });
  }

  function addOverride() {
    start(async () => {
      const res = await saveOverride({ date, day: trains ? { trains: true, time, intensity } : { trains: false, time: null, intensity: null } });
      if (res.ok) {
        setOverrideError(null);
        router.refresh();
      } else setOverrideError(Object.values(res.errors)[0] ?? 'No pudimos guardar.');
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Entrenamiento</h1>

      <section className="flex flex-col gap-3" aria-labelledby="semana">
        <div>
          <h2 id="semana" className="font-semibold">
            Semana tipo
          </h2>
          <p className="text-sm text-muted">Los días de entreno usan los carbos altos de tu etapa.</p>
        </div>
        <TrainingWeekFields
          week={week}
          onChange={(w) => {
            setWeek(w);
            setWeekSaved(false);
          }}
          errors={weekErrors}
        />
        <Button type="button" variant="primary" onClick={saveWeek} disabled={pending}>
          {weekSaved ? 'Semana guardada' : 'Guardar semana'}
        </Button>
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="cambios">
        <div>
          <h2 id="cambios" className="font-semibold">
            Cambio para un día
          </h2>
          <p className="text-sm text-muted">Si un día no entrenás o entrenás otro día, cambialo acá sin tocar la semana tipo.</p>
        </div>
        <Card className="flex flex-col gap-3">
          <Input label="Fecha" type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant={!trains ? 'primary' : 'secondary'} onClick={() => setTrains(false)}>
              No entreno
            </Button>
            <Button type="button" variant={trains ? 'primary' : 'secondary'} onClick={() => setTrains(true)}>
              Entreno
            </Button>
          </div>
          {trains && (
            <div className="grid grid-cols-2 gap-2">
              <Input label="Hora" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              <Select label="Intensidad" value={intensity} onChange={(e) => setIntensity(e.target.value as Intensity)}>
                {(Object.keys(INTENSITY_LABELS) as Intensity[]).map((i) => (
                  <option key={i} value={i}>
                    {INTENSITY_LABELS[i]}
                  </option>
                ))}
              </Select>
            </div>
          )}
          {overrideError && (
            <p role="alert" className="text-sm text-danger">
              {overrideError}
            </p>
          )}
          <Button type="button" onClick={addOverride} disabled={pending}>
            Guardar cambio
          </Button>
        </Card>

        {overrides.length > 0 && (
          <ul className="flex flex-col divide-y divide-border rounded-[var(--radius-card)] border border-border bg-surface">
            {overrides.map((o) => (
              <li key={o.date} className="flex items-center justify-between gap-2 p-3 text-sm">
                <span>
                  <span className="font-medium">{o.date === today ? 'Hoy' : fmtDate(o.date)}</span>
                  <span className="text-muted"> · {o.trains ? `Entreno ${o.time ?? ''}` : 'Sin entreno'}</span>
                </span>
                <button
                  type="button"
                  className="min-h-9 rounded-lg px-2 text-xs text-danger hover:bg-surface-2"
                  disabled={pending}
                  onClick={() =>
                    start(async () => {
                      await deleteOverride(o.date);
                      router.refresh();
                    })
                  }
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

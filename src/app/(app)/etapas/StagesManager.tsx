'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { draftToRules, rulesToDraft, StageRulesFields, type StageRulesDraft } from '@/components/StageRulesFields';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { autoStageRules } from '@/domain/stages';
import { dayTargets } from '@/domain/targets';
import type { ActivityLevel, Goal, ISODate, Sex, Stage } from '@/domain/types';
import { GOAL_LABELS } from '@/lib/labels';
import { closeStage, deleteStage, saveStage } from './actions';

type Person = { sex: Sex; heightCm: number; ageYears: number; activity: ActivityLevel; goal: Goal };

const fmtDate = (d: ISODate) => d.split('-').reverse().join('/');
const fmtNum = (n: number) => n.toLocaleString('es-AR', { maximumFractionDigits: 2 });

export function StagesManager({
  stages,
  activeId,
  today,
  weightKg,
  person,
}: {
  stages: Stage[];
  activeId: string | null;
  today: ISODate;
  weightKg: number;
  person: Person;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<Stage | 'new' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const run = (fn: () => Promise<{ ok: boolean; errors?: Record<string, string> }>) =>
    start(async () => {
      const res = await fn();
      if (res.ok) {
        setError(null);
        router.refresh();
      } else setError(Object.values(res.errors ?? {})[0] ?? 'Algo salió mal.');
    });

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Etapas</h1>
          <p className="text-sm text-muted">Peso de referencia: {fmtNum(weightKg)} kg</p>
        </div>
        {editing === null && (
          <Button type="button" variant="primary" onClick={() => setEditing('new')}>
            Nueva etapa
          </Button>
        )}
      </header>

      {editing !== null && (
        <StageEditor
          key={editing === 'new' ? 'new' : editing.id}
          stage={editing === 'new' ? null : editing}
          today={today}
          weightKg={weightKg}
          person={person}
          onCancel={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            router.refresh();
          }}
        />
      )}

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}

      {stages.length === 0 && editing === null && (
        <Card>
          <p className="font-semibold">Todavía no tenés etapas</p>
          <p className="mt-1 text-sm text-muted">Creá una para que Cheffit calcule tus macros del día.</p>
        </Card>
      )}

      <ul className="flex flex-col gap-3">
        {stages.map((s) => {
          const active = s.id === activeId;
          const training = dayTargets(s, weightKg, 'training');
          const rest = dayTargets(s, weightKg, 'rest');
          return (
            <li key={s.id}>
              <Card className={active ? 'border-accent' : ''}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-muted">
                      {GOAL_LABELS[s.goal]} · {s.mode === 'auto' ? 'automática' : 'de tu nutri'} · desde {fmtDate(s.startDate)}
                      {s.endDate ? ` hasta ${fmtDate(s.endDate)}` : ''}
                    </p>
                  </div>
                  {active && <span className="shrink-0 rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-on-accent">Activa</span>}
                </div>
                <p className="mt-2 text-xs tabular-nums text-muted">
                  <span className="text-protein">P {fmtNum(s.proteinGPerKg)}</span> · <span className="text-carbs">C {fmtNum(s.carbsTrainingGPerKg)} / {fmtNum(s.carbsRestGPerKg)}</span> ·{' '}
                  <span className="text-fat">G {fmtNum(s.fatGPerKg)}</span> g/kg
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs tabular-nums">
                  <p className="rounded-lg bg-surface-2 p-2">
                    <span className="block text-muted">Entreno</span>
                    {training.kcal} kcal · P {training.proteinG} · C {training.carbsG} · G {training.fatG}
                  </p>
                  <p className="rounded-lg bg-surface-2 p-2">
                    <span className="block text-muted">Descanso</span>
                    {rest.kcal} kcal · P {rest.proteinG} · C {rest.carbsG} · G {rest.fatG}
                  </p>
                </div>
                {s.notes && <p className="mt-2 text-sm text-muted">“{s.notes}”</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button type="button" onClick={() => setEditing(s)} disabled={pending}>
                    Editar
                  </Button>
                  {!s.endDate && (
                    <Button type="button" onClick={() => run(() => closeStage(s.id))} disabled={pending}>
                      Cerrar etapa
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-danger"
                    disabled={pending}
                    onClick={() => {
                      if (confirm(`¿Borrar la etapa "${s.name}"? No se puede deshacer.`)) run(() => deleteStage(s.id));
                    }}
                  >
                    Borrar
                  </Button>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StageEditor({
  stage,
  today,
  weightKg,
  person,
  onCancel,
  onSaved,
}: {
  stage: Stage | null;
  today: ISODate;
  weightKg: number;
  person: Person;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(stage?.name ?? '');
  const [goal, setGoal] = useState<Goal>(stage?.goal ?? person.goal);
  const [mode, setMode] = useState<'auto' | 'manual'>(stage?.mode ?? 'manual');
  const [draft, setDraft] = useState<StageRulesDraft>(
    stage ? rulesToDraft(stage) : { proteinGPerKg: '', carbsTrainingGPerKg: '', carbsRestGPerKg: '', fatGPerKg: '' },
  );
  const [startDate, setStartDate] = useState(stage?.startDate ?? today);
  const [endDate, setEndDate] = useState(stage?.endDate ?? '');
  const [notes, setNotes] = useState(stage?.notes ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, start] = useTransition();

  function applyAuto(g: Goal) {
    setMode('auto');
    setDraft(rulesToDraft(autoStageRules({ ...person, weightKg, goal: g })));
  }

  function save() {
    const rules = draftToRules(draft);
    start(async () => {
      const res = await saveStage({
        id: stage?.id,
        name: name.trim() || `${GOAL_LABELS[goal]} (${mode === 'auto' ? 'automática' : 'manual'})`,
        goal,
        mode,
        startDate,
        endDate: endDate || null,
        notes: notes.trim() || null,
        proteinGPerKg: rules.proteinGPerKg as number,
        carbsTrainingGPerKg: rules.carbsTrainingGPerKg as number,
        carbsRestGPerKg: rules.carbsRestGPerKg as number,
        fatGPerKg: rules.fatGPerKg as number,
      });
      if (res.ok) onSaved();
      else setErrors(res.errors);
    });
  }

  return (
    <Card className="flex flex-col gap-4">
      <h2 className="font-semibold">{stage ? 'Editar etapa' : 'Nueva etapa'}</h2>
      <Input label="Nombre" value={name} onChange={(e) => setName(e.target.value)} placeholder="Etapa 3 - pulido de la definición" error={errors.name} />
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Objetivo</legend>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(GOAL_LABELS) as Goal[]).map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={goal === g}
              onClick={() => {
                setGoal(g);
                if (mode === 'auto') applyAuto(g);
              }}
              className={`min-h-11 rounded-xl border text-sm font-semibold ${goal === g ? 'border-accent bg-accent text-on-accent' : 'border-border bg-surface-2'}`}
            >
              {GOAL_LABELS[g]}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant={mode === 'auto' ? 'primary' : 'secondary'} onClick={() => applyAuto(goal)}>
          Calcular automático
        </Button>
        <Button type="button" variant={mode === 'manual' ? 'primary' : 'secondary'} onClick={() => setMode('manual')}>
          Cargar a mano
        </Button>
      </div>
      <StageRulesFields draft={draft} onChange={setDraft} weightKg={weightKg} errors={errors} />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Empieza" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} error={errors.startDate} />
        <Input label="Termina (opcional)" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} error={errors.endDate} />
      </div>
      <Input label="Notas (opcional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      {errors._ && (
        <p role="alert" className="text-sm text-danger">
          {errors._}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="button" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button type="button" variant="primary" onClick={save} disabled={pending} className="flex-1">
          {pending ? 'Guardando…' : 'Guardar'}
        </Button>
      </div>
    </Card>
  );
}

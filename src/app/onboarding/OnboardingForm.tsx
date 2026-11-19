'use client';

import { useMemo, useState, useTransition } from 'react';
import { draftToRules, rulesToDraft, StageRulesFields, toNumber, type StageRulesDraft } from '@/components/StageRulesFields';
import { TrainingWeekFields } from '@/components/TrainingWeekFields';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Input';
import { ageOn } from '@/domain/dates';
import { autoStageRules } from '@/domain/stages';
import { SLOTS, type ActivityLevel, type Goal, type ISODate, type Slot, type TrainingDay } from '@/domain/types';
import { ACTIVITY_LABELS, GOAL_LABELS, RESTRICTION_OPTIONS, SLOT_LABELS } from '@/lib/labels';
import { fieldErrors } from '@/lib/validation';
import { completeOnboarding } from './actions';
import { buildOnboardingSchema, type OnboardingInput } from './schema';

const REST: TrainingDay = { trains: false, time: null, intensity: null };
const STEPS = ['Tus datos', 'Objetivo y comidas', 'Entrenamiento', 'Tu etapa'] as const;

/** Qué claves de error pertenecen a cada paso (para validar paso a paso). */
const STEP_FIELDS: string[][] = [
  ['displayName', 'sex', 'birthDate', 'heightCm', 'weightKg', 'activity'],
  ['goal', 'mealSlots', 'avoidedFoods', 'restrictions', 'maxCookMinutes'],
  ['week'],
  ['stage'],
];

const ETAPA_3_EJEMPLO: StageRulesDraft = { proteinGPerKg: '2.2', carbsTrainingGPerKg: '1.8', carbsRestGPerKg: '1.5', fatGPerKg: '1' };

export function OnboardingForm({ today }: { today: ISODate }) {
  const schema = useMemo(() => buildOnboardingSchema(today), [today]);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();

  const [displayName, setDisplayName] = useState('');
  const [sex, setSex] = useState<'' | 'male' | 'female'>('');
  const [birthDate, setBirthDate] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('cut');
  const [mealSlots, setMealSlots] = useState<Slot[]>(['breakfast', 'lunch', 'snack', 'dinner']);
  const [avoided, setAvoided] = useState('');
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [maxCook, setMaxCook] = useState('20');
  const [week, setWeek] = useState<TrainingDay[]>(() => Array.from({ length: 7 }, () => REST));
  const [stageMode, setStageMode] = useState<'auto' | 'manual'>('auto');
  const [stageName, setStageName] = useState('');
  const [stageNotes, setStageNotes] = useState('');
  const [manualDraft, setManualDraft] = useState<StageRulesDraft>({ proteinGPerKg: '', carbsTrainingGPerKg: '', carbsRestGPerKg: '', fatGPerKg: '' });
  const [autoEdits, setAutoEdits] = useState<StageRulesDraft | null>(null);

  const weight = toNumber(weightKg);
  const height = toNumber(heightCm);
  const age = /^\d{4}-\d{2}-\d{2}$/.test(birthDate) ? ageOn(birthDate, today) : undefined;
  const autoRules = sex && weight && height && age !== undefined ? autoStageRules({ sex, weightKg: weight, heightCm: height, ageYears: age, activity, goal }) : null;
  const autoDraft = autoEdits ?? (autoRules ? rulesToDraft(autoRules) : null);
  const stageDraft = stageMode === 'auto' ? autoDraft : manualDraft;

  function buildInput(): OnboardingInput {
    const rules = stageDraft ? draftToRules(stageDraft) : {};
    return {
      displayName: displayName.trim() || undefined,
      sex: sex as 'male' | 'female',
      birthDate,
      heightCm: height as number,
      weightKg: weight as number,
      activity,
      goal,
      mealSlots,
      avoidedFoods: avoided.split(',').map((s) => s.trim()).filter(Boolean),
      restrictions,
      maxCookMinutes: maxCook === '' ? null : Number(maxCook),
      week,
      stage: {
        mode: stageMode,
        name: stageName.trim() || (stageMode === 'auto' ? `${GOAL_LABELS[goal]} (automática)` : ''),
        notes: stageNotes.trim() || null,
        ...(rules as Required<typeof rules>),
      },
    };
  }

  function errorsForStep(all: Record<string, string>, s: number) {
    return Object.fromEntries(Object.entries(all).filter(([k]) => STEP_FIELDS[s].some((f) => k === f || k.startsWith(`${f}.`))));
  }

  function next() {
    const result = schema.safeParse(buildInput());
    const stepErrors = result.success ? {} : errorsForStep(fieldErrors(result.error), step);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) setStep(step + 1);
  }

  function submit() {
    const input = buildInput();
    const result = schema.safeParse(input);
    if (!result.success) {
      const all = fieldErrors(result.error);
      setErrors(all);
      const firstBad = STEP_FIELDS.findIndex((_, s) => Object.keys(errorsForStep(all, s)).length > 0);
      if (firstBad !== -1) setStep(firstBad);
      return;
    }
    startTransition(async () => {
      const res = await completeOnboarding(input);
      if (res && !res.ok) setErrors(res.errors);
    });
  }

  const toggleSlot = (slot: Slot) => setMealSlots((s) => (s.includes(slot) ? s.filter((x) => x !== slot) : SLOTS.filter((x) => x === slot || s.includes(x))));
  const toggleRestriction = (r: string) => setRestrictions((s) => (s.includes(r) ? s.filter((x) => x !== r) : [...s, r]));

  return (
    <div className="flex flex-col gap-5">
      <header>
        <p className="text-sm text-muted">
          Paso {step + 1} de {STEPS.length}
        </p>
        <h1 className="mt-1 text-2xl font-bold">{STEPS[step]}</h1>
        <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden="true">
          {STEPS.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full ${i <= step ? 'bg-accent' : 'bg-surface-2'}`} />
          ))}
        </div>
      </header>

      {step === 0 && (
        <Card className="flex flex-col gap-4">
          <Input label="¿Cómo te llamamos? (opcional)" value={displayName} onChange={(e) => setDisplayName(e.target.value)} autoComplete="given-name" />
          <Select label="Sexo biológico" value={sex} onChange={(e) => setSex(e.target.value as typeof sex)} error={errors.sex} hint="Se usa para estimar tu gasto calórico.">
            <option value="">Elegí una opción</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </Select>
          <Input label="Fecha de nacimiento" type="date" value={birthDate} max={today} onChange={(e) => setBirthDate(e.target.value)} error={errors.birthDate} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Altura (cm)" inputMode="numeric" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} error={errors.heightCm} placeholder="178" />
            <Input label="Peso (kg)" inputMode="decimal" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} error={errors.weightKg} placeholder="80" />
          </div>
          <Select label="Nivel de actividad" value={activity} onChange={(e) => setActivity(e.target.value as ActivityLevel)} hint={ACTIVITY_LABELS[activity].hint}>
            {(Object.keys(ACTIVITY_LABELS) as ActivityLevel[]).map((a) => (
              <option key={a} value={a}>
                {ACTIVITY_LABELS[a].label}
              </option>
            ))}
          </Select>
        </Card>
      )}

      {step === 1 && (
        <Card className="flex flex-col gap-5">
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium">Objetivo</legend>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(GOAL_LABELS) as Goal[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    setGoal(g);
                    setAutoEdits(null);
                  }}
                  aria-pressed={goal === g}
                  className={`min-h-11 rounded-xl border text-sm font-semibold ${goal === g ? 'border-accent bg-accent text-on-accent' : 'border-border bg-surface-2'}`}
                >
                  {GOAL_LABELS[g]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium">¿Qué comidas hacés en el día?</legend>
            <div className="flex flex-wrap gap-2">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSlot(s)}
                  aria-pressed={mealSlots.includes(s)}
                  className={`min-h-10 rounded-full border px-3 text-sm ${mealSlots.includes(s) ? 'border-accent bg-carbs-bg text-text' : 'border-border text-muted'}`}
                >
                  {SLOT_LABELS[s]}
                </button>
              ))}
            </div>
            {errors.mealSlots && <p role="alert" className="text-xs text-danger">{errors.mealSlots}</p>}
          </fieldset>
          <Input label="Alimentos que preferís evitar" value={avoided} onChange={(e) => setAvoided(e.target.value)} hint="Separalos con comas: hígado, berenjena" />
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium">Restricciones</legend>
            <div className="flex flex-wrap gap-2">
              {RESTRICTION_OPTIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleRestriction(r)}
                  aria-pressed={restrictions.includes(r)}
                  className={`min-h-10 rounded-full border px-3 text-sm ${restrictions.includes(r) ? 'border-accent bg-carbs-bg text-text' : 'border-border text-muted'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </fieldset>
          <Select label="Tiempo máximo para cocinar" value={maxCook} onChange={(e) => setMaxCook(e.target.value)}>
            {['10', '15', '20', '30', '45', '60'].map((m) => (
              <option key={m} value={m}>
                {m} minutos
              </option>
            ))}
            <option value="">Sin límite</option>
          </Select>
        </Card>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted">Marcá los días que entrenás y a qué hora. Los días de entreno llevan más carbos.</p>
          <TrainingWeekFields week={week} onChange={setWeek} errors={errors} />
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            {(['auto', 'manual'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setStageMode(m)}
                aria-pressed={stageMode === m}
                className={`rounded-xl border p-3 text-left ${stageMode === m ? 'border-accent bg-carbs-bg' : 'border-border bg-surface'}`}
              >
                <span className="block text-sm font-semibold">{m === 'auto' ? 'Calcular automático' : 'Cargar las de mi nutri'}</span>
                <span className="mt-1 block text-xs text-muted">{m === 'auto' ? 'Según tus datos y objetivo' : 'Reglas en g por kg'}</span>
              </button>
            ))}
          </div>
          <Card className="flex flex-col gap-4">
            <Input
              label="Nombre de la etapa"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
              placeholder={stageMode === 'auto' ? `${GOAL_LABELS[goal]} (automática)` : 'Etapa 3 - pulido de la definición'}
              error={errors['stage.name']}
            />
            {stageDraft ? (
              <StageRulesFields
                draft={stageDraft}
                onChange={stageMode === 'auto' ? setAutoEdits : setManualDraft}
                weightKg={weight}
                errors={errors}
                errorPrefix="stage."
              />
            ) : (
              <p className="text-sm text-muted">Completá tus datos del paso 1 para calcular la etapa.</p>
            )}
            {stageMode === 'manual' && !manualDraft.proteinGPerKg && (
              <Button type="button" variant="ghost" onClick={() => setManualDraft(ETAPA_3_EJEMPLO)}>
                Usar ejemplo: Etapa 3 (2,2 / 1,8 / 1,5 / 1)
              </Button>
            )}
            <Input label="Notas de tu nutri (opcional)" value={stageNotes} onChange={(e) => setStageNotes(e.target.value)} placeholder="Déficit calórico fuerte" />
          </Card>
          <p className="text-xs text-muted">Cheffit es una herramienta de apoyo: no reemplaza a un profesional de la nutrición.</p>
        </div>
      )}

      {errors._ && (
        <p role="alert" className="text-sm text-danger">
          {errors._}
        </p>
      )}

      <div className="flex gap-2">
        {step > 0 && (
          <Button type="button" onClick={() => setStep(step - 1)} className="flex-1">
            Atrás
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button type="button" variant="primary" onClick={next} className="flex-1">
            Siguiente
          </Button>
        ) : (
          <Button type="button" variant="primary" onClick={submit} disabled={pending} className="flex-1">
            {pending ? 'Guardando…' : 'Empezar'}
          </Button>
        )}
      </div>
    </div>
  );
}

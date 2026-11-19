'use client';

import { dayTargets } from '@/domain/targets';
import type { StageRules } from '@/domain/types';
import { Input } from './ui/Input';

/** Valores de una etapa como texto (inputs controlados) → números. */
export type StageRulesDraft = Record<keyof StageRules, string>;

export function rulesToDraft(r: StageRules): StageRulesDraft {
  return {
    proteinGPerKg: String(r.proteinGPerKg),
    carbsTrainingGPerKg: String(r.carbsTrainingGPerKg),
    carbsRestGPerKg: String(r.carbsRestGPerKg),
    fatGPerKg: String(r.fatGPerKg),
  };
}

export function toNumber(s: string): number | undefined {
  const n = Number(s.replace(',', '.'));
  return s.trim() === '' || Number.isNaN(n) ? undefined : n;
}

export function draftToRules(d: StageRulesDraft): Partial<StageRules> {
  return {
    proteinGPerKg: toNumber(d.proteinGPerKg),
    carbsTrainingGPerKg: toNumber(d.carbsTrainingGPerKg),
    carbsRestGPerKg: toNumber(d.carbsRestGPerKg),
    fatGPerKg: toNumber(d.fatGPerKg),
  };
}

const FIELDS: { key: keyof StageRules; label: string; tone: string }[] = [
  { key: 'proteinGPerKg', label: 'Proteínas', tone: 'text-protein' },
  { key: 'carbsTrainingGPerKg', label: 'Carbos día de entreno', tone: 'text-carbs' },
  { key: 'carbsRestGPerKg', label: 'Carbos día de descanso', tone: 'text-carbs' },
  { key: 'fatGPerKg', label: 'Grasas', tone: 'text-fat' },
];

export function StageRulesFields({
  draft,
  onChange,
  weightKg,
  errors = {},
  errorPrefix = '',
}: {
  draft: StageRulesDraft;
  onChange: (d: StageRulesDraft) => void;
  weightKg: number | undefined;
  errors?: Record<string, string>;
  errorPrefix?: string;
}) {
  const rules = draftToRules(draft);
  const complete = Object.values(rules).every((v) => v !== undefined);
  const preview =
    complete && weightKg
      ? { training: dayTargets(rules as StageRules, weightKg, 'training'), rest: dayTargets(rules as StageRules, weightKg, 'rest') }
      : null;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {FIELDS.map((f) => (
          <Input
            key={f.key}
            label={`${f.label} (g/kg)`}
            inputMode="decimal"
            value={draft[f.key]}
            onChange={(e) => onChange({ ...draft, [f.key]: e.target.value })}
            error={errors[`${errorPrefix}${f.key}`]}
          />
        ))}
      </div>
      {preview && (
        <div className="grid grid-cols-2 gap-2 text-xs">
          {(['training', 'rest'] as const).map((type) => (
            <div key={type} className="rounded-xl bg-surface-2 p-3">
              <p className="font-medium text-muted">{type === 'training' ? 'Día de entreno' : 'Día de descanso'}</p>
              <p className="mt-1 text-base font-semibold tabular-nums">{preview[type].kcal} kcal</p>
              <p className="tabular-nums">
                <span className="text-protein">P {preview[type].proteinG}</span> · <span className="text-carbs">C {preview[type].carbsG}</span> ·{' '}
                <span className="text-fat">G {preview[type].fatG}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

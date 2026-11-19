import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';

const FIELD =
  'min-h-11 w-full rounded-xl border border-border bg-surface-2 px-3 text-text placeholder:text-muted focus:border-accent focus:outline-none';

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      {children}
      {hint && !error && <span className="text-xs text-muted">{hint}</span>}
      {error && (
        <span role="alert" className="text-xs text-danger">
          {error}
        </span>
      )}
    </label>
  );
}

export function Input({
  label,
  error,
  hint,
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  return (
    <Field label={label} error={error} hint={hint}>
      <input className={`${FIELD} ${className}`} aria-invalid={error ? true : undefined} {...props} />
    </Field>
  );
}

export function Select({
  label,
  error,
  hint,
  className = '',
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string; hint?: string }) {
  return (
    <Field label={label} error={error} hint={hint}>
      <select className={`${FIELD} ${className}`} aria-invalid={error ? true : undefined} {...props}>
        {children}
      </select>
    </Field>
  );
}

'use client';

import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { signIn, signUp, type AuthState } from './actions';

const initial: AuthState = { error: null };

export default function LoginPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [state, action, pending] = useActionState(mode === 'signin' ? signIn : signUp, initial);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center gap-6 px-4 py-10">
      <div>
        <p className="text-sm font-medium text-accent">Tu chef personal deportivo</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Cheffit</h1>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-8 rounded-full bg-protein" />
          <span className="h-1.5 w-8 rounded-full bg-carbs" />
          <span className="h-1.5 w-8 rounded-full bg-fat" />
        </div>
      </div>

      <Card>
        <form action={action} className="flex flex-col gap-4">
          <Input label="Email" name="email" type="email" autoComplete="email" required placeholder="vos@ejemplo.com" />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            required
            minLength={8}
            hint={mode === 'signup' ? 'Mínimo 8 caracteres.' : undefined}
          />
          {state.error && (
            <p role="alert" className="text-sm text-danger">
              {state.error}
            </p>
          )}
          <Button type="submit" variant="primary" disabled={pending}>
            {pending ? 'Un momento…' : mode === 'signin' ? 'Ingresar' : 'Crear cuenta'}
          </Button>
        </form>
      </Card>

      <Button type="button" variant="ghost" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
        {mode === 'signin' ? '¿No tenés cuenta? Creala' : '¿Ya tenés cuenta? Ingresá'}
      </Button>
    </main>
  );
}

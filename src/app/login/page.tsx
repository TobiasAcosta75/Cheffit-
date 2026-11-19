'use client';

import { useActionState, useState } from 'react';
import { signIn, signUp, type AuthState } from './actions';

const initial: AuthState = { error: null };

export default function LoginPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [state, action, pending] = useActionState(mode === 'signin' ? signIn : signUp, initial);

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center gap-6 px-4">
      <h1 className="text-2xl font-bold">Cheffit</h1>
      <form action={action} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          Email
          <input name="email" type="email" autoComplete="email" required className="rounded border px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1">
          Contraseña
          <input
            name="password"
            type="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            required
            minLength={8}
            className="rounded border px-3 py-2"
          />
        </label>
        {state.error && <p role="alert">{state.error}</p>}
        <button type="submit" disabled={pending} className="rounded border px-3 py-2 font-semibold">
          {mode === 'signin' ? 'Ingresar' : 'Crear cuenta'}
        </button>
      </form>
      <button type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="underline">
        {mode === 'signin' ? '¿No tenés cuenta? Creala' : '¿Ya tenés cuenta? Ingresá'}
      </button>
    </main>
  );
}

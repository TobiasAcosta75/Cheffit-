'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createServerSupabase } from '@/lib/supabase/server';

const credentialsSchema = z.object({
  email: z.string().trim().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export type AuthState = { error: string | null };

function readCredentials(formData: FormData) {
  return credentialsSchema.safeParse({ email: formData.get('email'), password: formData.get('password') });
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = readCredentials(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: 'Email o contraseña incorrectos' };
  redirect('/');
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = readCredentials(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.signUp(parsed.data);
  if (error) return { error: error.message };
  if (!data.session) return { error: 'Te enviamos un mail para confirmar la cuenta. Confirmala y después ingresá.' };
  redirect('/onboarding');
}

export async function signOut() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect('/login');
}

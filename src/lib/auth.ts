import { redirect } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { createServerSupabase } from './supabase/server';
import type { Database } from './supabase/database.types';

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];

/** Usuario logueado y su perfil; redirige a /login sin sesión y a /onboarding si no lo completó. */
export async function requireUser(options: { allowNotOnboarded?: boolean } = {}): Promise<{ user: User; profile: ProfileRow }> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (!profile) redirect('/login');
  if (!profile.onboarded && !options.allowNotOnboarded) redirect('/onboarding');
  return { user, profile };
}

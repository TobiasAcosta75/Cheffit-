import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { connection } from 'next/server';
import type { Database } from './database.types';

/**
 * Cliente de Supabase para Server Components, Server Actions y Route Handlers.
 * `connection()` marca el render como de request: la sesión se valida contra la hora actual,
 * que con Cache Components no puede leerse durante el prerender.
 */
export async function createServerSupabase() {
  await connection();
  const cookieStore = await cookies();
  return createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) cookieStore.set(name, value, options);
        } catch {
          // Llamado desde un Server Component: el proxy se encarga de refrescar la sesión.
        }
      },
    },
  });
}

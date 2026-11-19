import { randomUUID } from 'node:crypto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { afterAll, beforeAll, expect, test } from 'vitest';
import { searchFoodsFor } from '@/lib/food-search';
import { createAdminSupabase } from '@/lib/supabase/admin';
import type { Database } from '@/lib/supabase/database.types';

// Requiere el proyecto de Supabase configurado en .env.local.
const admin = createAdminSupabase();
const tag = `zq${randomUUID().slice(0, 8)}`;
const userIds: string[] = [];
let globalId: string;

async function newUser(): Promise<{ id: string; client: SupabaseClient<Database> }> {
  const email = `search-${randomUUID()}@test.local`;
  const password = randomUUID();
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error || !data.user) throw error ?? new Error('no user');
  userIds.push(data.user.id);
  const client = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: e } = await client.auth.signInWithPassword({ email, password });
  if (e) throw e;
  return { id: data.user.id, client };
}

let A: Awaited<ReturnType<typeof newUser>>;
let B: Awaited<ReturnType<typeof newUser>>;

beforeAll(async () => {
  A = await newUser();
  B = await newUser();
  const { data, error } = await admin
    .from('foods')
    .insert({ name: `${tag} original`, search_name: `${tag} original`, category: 'otros', source: 'manual', kcal_100: 100, protein_100: 20, carbs_100: 0, fat_100: 2 })
    .select('id')
    .single();
  if (error) throw error;
  globalId = data.id;
  await admin.from('household_measures').insert({ food_id: globalId, label: '1 porción', grams: 150 });
  // A corrige el global y además le cambia el nombre.
  const { error: copyError } = await A.client.from('foods').insert({
    owner_id: A.id,
    overrides_food_id: globalId,
    name: `${tag} renombrado`,
    search_name: `${tag} renombrado`,
    category: 'otros',
    source: 'user',
    kcal_100: 90,
    protein_100: 17,
    carbs_100: 0,
    fat_100: 2,
  });
  if (copyError) throw copyError;
});

afterAll(async () => {
  await admin.from('foods').delete().eq('id', globalId);
  for (const id of userIds) await admin.auth.admin.deleteUser(id);
});

test('un global corregido no reaparece aunque la copia tenga otro nombre', async () => {
  const results = await searchFoodsFor(A.client, A.id, `${tag} original`);
  expect(results.map((f) => f.id)).not.toContain(globalId);
});

test('otro usuario sigue viendo el global', async () => {
  const results = await searchFoodsFor(B.client, B.id, `${tag} original`);
  expect(results.map((f) => f.id)).toContain(globalId);
});

test('la copia sin medidas propias hereda las del global aunque no aparezca en la búsqueda', async () => {
  const results = await searchFoodsFor(A.client, A.id, `${tag} renombrado`);
  expect(results).toHaveLength(1);
  expect(results[0].measures).toEqual([{ label: '1 porción', grams: 150 }]);
});

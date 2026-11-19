import { randomUUID } from 'node:crypto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { createAdminSupabase } from '@/lib/supabase/admin';

// Requiere Supabase local corriendo (`npx supabase start`) y .env.local con sus claves.
const admin = createAdminSupabase();
const createdUserIds: string[] = [];

async function newUser(isAdmin = false): Promise<{ id: string; client: SupabaseClient }> {
  const email = `rls-${randomUUID()}@test.local`;
  const password = randomUUID();
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error || !data.user) throw error ?? new Error('no user');
  createdUserIds.push(data.user.id);
  if (isAdmin) {
    const { error: e } = await admin.from('profiles').update({ is_admin: true }).eq('id', data.user.id);
    if (e) throw e;
  }
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: signInError } = await client.auth.signInWithPassword({ email, password });
  if (signInError) throw signInError;
  return { id: data.user.id, client };
}

const stageRow = (userId: string) => ({
  user_id: userId,
  name: 'Etapa 3',
  start_date: '2026-11-18',
  goal: 'cut',
  mode: 'manual',
  protein_g_per_kg: 2.2,
  carbs_training_g_per_kg: 1.8,
  carbs_rest_g_per_kg: 1.5,
  fat_g_per_kg: 1,
});

const foodRow = (over: Record<string, unknown> = {}) => ({
  name: 'Alimento test',
  search_name: 'alimento test',
  category: 'otros',
  source: 'manual',
  kcal_100: 100,
  protein_100: 10,
  carbs_100: 10,
  fat_100: 2,
  ...over,
});

let A: Awaited<ReturnType<typeof newUser>>;
let B: Awaited<ReturnType<typeof newUser>>;
let globalFoodId: string;

beforeAll(async () => {
  A = await newUser();
  B = await newUser();
  const { data, error } = await admin.from('foods').insert(foodRow({ name: 'Global test' })).select('id').single();
  if (error) throw error;
  globalFoodId = data.id;
});

afterAll(async () => {
  await admin.from('foods').delete().eq('id', globalFoodId);
  for (const id of createdUserIds) await admin.auth.admin.deleteUser(id);
});

describe('RLS', () => {
  test('al crear un usuario se crea su perfil', async () => {
    const { data } = await A.client.from('profiles').select('id, is_admin').single();
    expect(data).toEqual({ id: A.id, is_admin: false });
  });

  test('un usuario no ve las etapas de otro', async () => {
    const { error } = await A.client.from('stages').insert(stageRow(A.id));
    expect(error).toBeNull();
    const { data } = await B.client.from('stages').select('id');
    expect(data).toEqual([]);
  });

  test('un usuario no puede insertar filas a nombre de otro', async () => {
    const { error } = await B.client.from('stages').insert(stageRow(A.id));
    expect(error).not.toBeNull();
  });

  test('un usuario no puede hacerse admin', async () => {
    await A.client.from('profiles').update({ is_admin: true }).eq('id', A.id);
    const { data } = await admin.from('profiles').select('is_admin').eq('id', A.id).single();
    expect(data?.is_admin).toBe(false);
  });

  test('un usuario puede editar sus datos de perfil', async () => {
    const { error } = await A.client.from('profiles').update({ display_name: 'Tobi' }).eq('id', A.id);
    expect(error).toBeNull();
  });

  test('un usuario común no puede editar un alimento global', async () => {
    const { data } = await A.client.from('foods').update({ protein_100: 99 }).eq('id', globalFoodId).select('id');
    expect(data).toEqual([]);
  });

  test('un admin puede editar un alimento global', async () => {
    const adminUser = await newUser(true);
    const { data } = await adminUser.client.from('foods').update({ protein_100: 11 }).eq('id', globalFoodId).select('id');
    expect(data).toEqual([{ id: globalFoodId }]);
  });

  test('la copia personal de un global solo la ve su dueño', async () => {
    const { data: copy, error } = await A.client
      .from('foods')
      .insert(foodRow({ owner_id: A.id, overrides_food_id: globalFoodId, source: 'user' }))
      .select('id')
      .single();
    expect(error).toBeNull();
    const { data: seenByB } = await B.client.from('foods').select('id').eq('id', copy!.id);
    expect(seenByB).toEqual([]);
    const { data: globalSeenByB } = await B.client.from('foods').select('id').eq('id', globalFoodId);
    expect(globalSeenByB).toEqual([{ id: globalFoodId }]);
  });

  test('un usuario no puede crear alimentos globales', async () => {
    const { error } = await A.client.from('foods').insert(foodRow());
    expect(error).not.toBeNull();
  });
});

/**
 * Crea (o actualiza) el usuario de desarrollo definido en .env.local y lo marca como admin.
 * Si DEV_USER_PASSWORD está vacío, genera una contraseña y la guarda en .env.local (no la imprime).
 *
 * Uso: npx tsx scripts/create-dev-user.ts
 */
import { randomBytes } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve(__dirname, '..', '.env.local');

function readEnv(): Record<string, string> {
  const env: Record<string, string> = {};
  for (const line of fs.readFileSync(envPath, 'utf8').replace(/\r/g, '').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) env[m[1]] = m[2];
  }
  return env;
}

function setEnvValue(key: string, value: string) {
  const content = fs.readFileSync(envPath, 'utf8').replace(/\r/g, '');
  const re = new RegExp(`^${key}=.*$`, 'm');
  fs.writeFileSync(envPath, re.test(content) ? content.replace(re, `${key}=${value}`) : `${content.trimEnd()}\n${key}=${value}\n`);
}

async function main() {
  const env = readEnv();
  const email = env.DEV_USER_EMAIL;
  if (!email) throw new Error('Completá DEV_USER_EMAIL en .env.local');
  let password = env.DEV_USER_PASSWORD;
  if (!password) {
    password = randomBytes(18).toString('base64url');
    setEnvValue('DEV_USER_PASSWORD', password);
    console.log('Contraseña generada y guardada en .env.local (DEV_USER_PASSWORD).');
  }

  const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: list, error: listError } = await admin.auth.admin.listUsers({ perPage: 1000 });
  if (listError) throw listError;
  const existing = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  let userId: string;
  if (existing) {
    const { error } = await admin.auth.admin.updateUserById(existing.id, { password, email_confirm: true });
    if (error) throw error;
    userId = existing.id;
    console.log('Usuario de desarrollo actualizado.');
  } else {
    const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
    if (error || !data.user) throw error ?? new Error('No se pudo crear el usuario');
    userId = data.user.id;
    console.log('Usuario de desarrollo creado.');
  }

  const { error: adminError } = await admin.from('profiles').update({ is_admin: true }).eq('id', userId);
  if (adminError) throw adminError;
  console.log('Marcado como administrador.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

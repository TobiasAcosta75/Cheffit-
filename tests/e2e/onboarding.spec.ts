import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { createAdminSupabase } from '../../src/lib/supabase/admin';

const admin = createAdminSupabase();
const email = `e2e-${randomUUID()}@test.local`;
const password = `E2e-${randomUUID()}`;
let userId: string | undefined;

test.beforeAll(async () => {
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error || !data.user) throw error ?? new Error('No se pudo crear el usuario de prueba');
  userId = data.user.id;
});

test.afterAll(async () => {
  if (userId) await admin.auth.admin.deleteUser(userId);
});

test('login → onboarding con Etapa 3 → panel → registrar pechuga', async ({ page }) => {
  // Login
  await page.goto('/');
  await expect(page).toHaveURL(/\/login$/);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Contraseña').fill(password);
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await expect(page).toHaveURL(/\/onboarding$/);

  // Paso 1: datos
  await page.getByLabel('Sexo biológico').selectOption('male');
  await page.getByLabel('Fecha de nacimiento').fill('1996-05-10');
  await page.getByLabel('Altura (cm)').fill('180');
  await page.getByLabel('Peso (kg)').fill('80');
  await page.getByRole('button', { name: 'Siguiente' }).click();

  // Paso 2: objetivo y comidas (valores por defecto)
  await expect(page.getByRole('heading', { name: 'Objetivo y comidas' })).toBeVisible();
  await page.getByRole('button', { name: 'Siguiente' }).click();

  // Paso 3: entrena todos los días a las 19:00 (hora por defecto al marcar)
  await expect(page.getByRole('heading', { name: 'Entrenamiento' })).toBeVisible();
  const checkboxes = page.getByRole('checkbox');
  await expect(checkboxes).toHaveCount(7);
  for (let i = 0; i < 7; i++) await checkboxes.nth(i).check();
  await page.getByRole('button', { name: 'Siguiente' }).click();

  // Paso 4: etapa manual (Etapa 3)
  await page.getByRole('button', { name: /Cargar las de mi nutri/ }).click();
  await page.getByRole('button', { name: /Usar ejemplo: Etapa 3/ }).click();
  await page.getByLabel('Nombre de la etapa').fill('Etapa 3 - pulido de la definición');
  await page.getByRole('button', { name: 'Empezar' }).click();

  // Panel del día: día de entreno, 80 kg → P 176 / C 144 / G 80 / 2000 kcal
  await expect(page).toHaveURL(/\/$/);
  const macros = page.getByRole('region', { name: 'Macros del día' });
  await expect(macros.getByRole('progressbar', { name: 'Calorías' })).toHaveAttribute('aria-valuemax', '2000');
  await expect(macros.getByRole('progressbar', { name: 'Proteínas' })).toHaveAttribute('aria-valuemax', '176');
  await expect(macros.getByRole('progressbar', { name: 'Carbos' })).toHaveAttribute('aria-valuemax', '144');
  await expect(macros.getByRole('progressbar', { name: 'Grasas' })).toHaveAttribute('aria-valuemax', '80');

  // Registrar 150 g de pechuga en el almuerzo
  await page.getByRole('button', { name: '+ Agregar a almuerzo' }).click();
  await page.getByLabel('Buscar alimento').fill('pechuga');
  await page.getByRole('button', { name: /Pechuga de pollo \(cruda\)/ }).click();
  await page.getByLabel('Medida').selectOption('g');
  await page.getByLabel('Cantidad').fill('150');
  await page.getByRole('button', { name: 'Agregar', exact: true }).click();

  await expect(macros.getByRole('progressbar', { name: 'Proteínas' })).toHaveAttribute('aria-valuenow', '33.8');
  await expect(page.getByRole('region', { name: 'Almuerzo' })).toContainText('150 g · 180 kcal');
});

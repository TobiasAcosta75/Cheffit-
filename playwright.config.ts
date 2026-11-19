import { defineConfig, devices } from '@playwright/test';

// Carga las claves de Supabase para crear y borrar el usuario de prueba.
try {
  process.loadEnvFile('.env.local');
} catch {
  // En CI las variables vienen del entorno.
}

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    ...devices['Pixel 7'],
    locale: 'es-AR',
    timezoneId: 'America/Argentina/Buenos_Aires',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000/login',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});

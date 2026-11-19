import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import path from 'node:path';

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  test: {
    include: ['tests/db/**/*.test.ts'],
    testTimeout: 30000,
    fileParallelism: false,
    env: loadEnv('test', process.cwd(), ''),
  },
});

import { join } from 'node:path';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: { 'server-only': join(import.meta.dirname, 'src/test/empty-module.ts') },
  },
  test: {
    // Test values for src/env.ts, which validates on import.
    env: { NEXT_PUBLIC_API_URL: 'http://localhost:4000', SESSION_COOKIE_NAME: 'clanos_session' },
    projects: [
      {
        plugins: [react()],
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/**/*.test.{ts,tsx}'],
          setupFiles: ['./src/test/setup.ts'],
        },
      },
      {
        test: {
          name: 'scripts',
          environment: 'node',
          include: ['scripts/**/*.test.ts'],
        },
      },
      {
        // Every story renders in Chromium and is checked with axe (see .storybook/preview.tsx).
        plugins: [storybookTest({ configDir: join(import.meta.dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});

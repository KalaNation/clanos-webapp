import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;
const BASE_URL = `http://localhost:${String(PORT)}`;
const isCI = Boolean(process.env.CI);

// Viewports match the design frames: D## screens are 1440px wide, M## screens 390px.
const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 390, height: 844 };

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: BASE_URL, trace: 'on-first-retry' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: DESKTOP_VIEWPORT } },
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], viewport: MOBILE_VIEWPORT, hasTouch: true },
    },
  ],
  webServer: {
    // CI builds the app in an earlier step, so it only needs to start it.
    command: isCI ? 'pnpm start' : 'pnpm dev',
    url: BASE_URL,
    reuseExistingServer: !isCI,
  },
});

import { expect, test } from '@playwright/test';

// Runs in the desktop (1440px) and mobile (390px) projects from playwright.config.ts.
test('sign-in loads under the CSP without errors', async ({ page }) => {
  const problems: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(message.text());
  });
  page.on('pageerror', (error) => problems.push(error.message));

  const response = await page.goto('/sign-in');

  expect(response?.status()).toBe(200);
  expect(response?.headers()['content-security-policy']).toContain("'strict-dynamic'");
  await expect(page.getByRole('heading', { level: 1, name: 'Sign in' })).toBeVisible();
  expect(problems).toEqual([]);
});

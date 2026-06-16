import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

    // Cada test corre en paralelo dentro del mismo archivo
    fullyParallel: true,

  // En CI reintenta una vez si falla — reduce falsos negativos
  retries: process.env.CI ? 1 : 0,

  // En CI corre en paralelo con 2 workers
  workers: process.env.CI ? 2 : undefined,

  // Reporte HTML siempre — en CI no lo abre automáticamente
  reporter: [
    ['html', { open: 'never' }],
    ['list'],                    // muestra resultados en la terminal
  ],

  use: {
    // testIdAttribute: 'data-test',  ← quitar de aquí
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      testMatch: '**/todomvc/**',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'saucedemo',
      testMatch: '**/saucedemo/**',
      use: {
        ...devices['Desktop Chrome'],
        testIdAttribute: 'data-test',
      },
    },
    // Mobile
  {
    name: 'mobile',
    testMatch: '**/todomvc/**',
    use: { ...devices['Pixel 5'] },
  },

    // API tests — sin browser
    {
      name: 'api',
      testMatch: '**/api/**',
      use: {},
    },
  ],
});
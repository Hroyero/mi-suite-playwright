import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

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
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',     // graba trace si un test falla y reintenta
    screenshot: 'only-on-failure', // screenshot automático si falla
    video: 'retain-on-failure',  // video si falla
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }*/
  ],
});
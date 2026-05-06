import { test, expect } from '@playwright/test';

test.describe('TodoMVC - verificaciones basicas, (test de smoke)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('La pagina carga y tiene el titulo correcto', async ({ page }) => {
    await expect(page).toHaveTitle(/TodoMVC/);
  });

  test('el input para agregar tareas está visible', async ({ page }) => {
    const input = page.getByRole('textbox');
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
  });

  test('puedo agregar una tarea nueva', async ({ page }) => {
    await page.getByRole('textbox').fill('Aprender Playwright');
    await page.getByRole('textbox').press('Enter');
    await expect(page.getByTestId('todo-item')).toHaveText('Aprender Playwright');
  });

  test('puedo marcar una tarea como completada', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('Tarea test');
    await input.press('Enter');

    await page.getByRole('listitem')
      .filter({ hasText: 'Tarea test' })
      .getByRole('checkbox')
      .check();

    await expect(page.getByText('0 items left')).toBeVisible();
  });

  test('Actualizar tareas pendiente a completada', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('Tarea uno');
    await input.press('Enter');
    await input.fill('Tarea dos');
    await input.press('Enter');

    await expect(page.getByText('2 items left')).toBeVisible();

    await page.getByRole('listitem')
      .filter({ hasText: 'Tarea uno' })
      .getByRole('checkbox')
      .check();

    await expect(page.getByText('1 item left')).toBeVisible();
  });

});
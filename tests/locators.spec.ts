import { test, expect } from '@playwright/test';

test.describe('Locators - TodoMVC', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('agregar tarea con getByRole', async ({ page }) => {
    await page.getByRole('textbox').fill('Mi tarea con getByRole');
    await page.getByRole('textbox').press('Enter');
    await expect(page.getByTestId('todo-item'))
      .toHaveText('Mi tarea con getByRole');
  });

  test('completar una tarea específica', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('Comprar leche');
    await input.press('Enter');
    await input.fill('Leer libro');
    await input.press('Enter');

    await page.getByRole('listitem')
      .filter({ hasText: 'Comprar leche' })
      .getByRole('checkbox')
      .check();

    await expect(page.getByText('1 item left')).toBeVisible();
  });

  test('filtrar tareas activas', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('Tarea uno');
    await input.press('Enter');
    await input.fill('Tarea dos');
    await input.press('Enter');
    await input.fill('Tarea tres');
    await input.press('Enter');

    await page.getByRole('listitem')
      .filter({ hasText: 'Tarea dos' })
      .getByRole('checkbox')
      .check();

    await page.getByRole('link', { name: 'Active' }).click();

    await expect(page.getByText('Tarea uno')).toBeVisible();
    await expect(page.getByText('Tarea tres')).toBeVisible();
    await expect(page.getByText('Tarea dos')).not.toBeVisible();
  });

});
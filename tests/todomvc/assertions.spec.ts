import { test, expect } from '@playwright/test';

test.describe('Assertions en TodoMVC', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('la lista empieza vacía', async ({ page }) => {
    await expect(page.getByTestId('todo-item')).toHaveCount(0);
  });

  test('verificar múltiples textos a la vez', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('Tarea A'); await input.press('Enter');
    await input.fill('Tarea B'); await input.press('Enter');
    await input.fill('Tarea C'); await input.press('Enter');

    await expect(page.getByTestId('todo-item'))
      .toHaveText(['Tarea A', 'Tarea B', 'Tarea C']);
  });

  test('verificar estado del checkbox', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('Tarea test');
    await input.press('Enter');

    const checkbox = page.getByRole('listitem')
      .filter({ hasText: 'Tarea test' })
      .getByRole('checkbox');

    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test('la URL no cambia al agregar tareas', async ({ page }) => {
    await expect(page).toHaveURL('https://demo.playwright.dev/todomvc/#/');
  });

});
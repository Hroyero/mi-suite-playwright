import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Login — SauceDemo', () => {

  test('login exitoso', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('login con credenciales incorrectas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('usuario_malo', 'password_malo');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

});
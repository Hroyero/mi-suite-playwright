// saucedemo.spec.ts
import { test, expect } from '../../src/fixtures/index';
import { ProductPage } from '../../src/pages/ProductsPage';
import { CartPage } from '../../src/pages/CartPage';
import { LoginPage } from '../../src/pages/LoginPage';  // ← usa LoginPage normal
import { USERS } from '../../src/data/users';

test.describe('SauceDemo con Fixtures', () => {

  test('ver productos después del login', async ({ loggedInPage }) => {
    const productPage = new ProductPage(loggedInPage);
    expect(await productPage.isPageTitleVisible()).toBe(true);
    expect(await productPage.getProductCount()).toBe(6);
  });

  test('verificar carrito con productos', async ({ pageWithCart }) => {
    const cartPage = new CartPage(pageWithCart);
    await cartPage.goto();
    expect(await cartPage.getItemCount()).toBe(2);

    const nombres = await cartPage.getItemNames();
    expect(nombres).toContain('Sauce Labs Backpack');
    expect(nombres).toContain('Sauce Labs Onesie');

    await cartPage.proceedToCheckout();
    await expect(pageWithCart).toHaveURL(/checkout-step-one/);
  });

  // ✅ Usuario bloqueado — sin fixture especial, solo LoginPage
  test('usuario bloqueado muestra error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.locked.username, USERS.locked.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

});
import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../data/users';

// Define los tipos de todas tus fixtures
type AppFixtures = {
  loggedInPage: Page;
  pageWithCart: Page;
};

export const test = base.extend<AppFixtures>({

  // Fixture 1 — ya logueado
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await use(page);
  },

  // Fixture 2 — logueado Y con 2 productos en el carrito
  pageWithCart: async ({ page }, use) => {
    // Primero hace login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Luego agrega productos
    const productPage = new ProductPage(page);
    await productPage.addToCart('Sauce Labs Backpack');
    await productPage.addToCart('Sauce Labs Onesie');

    await use(page);
  },

});

// Exporta expect también para usarlo en los tests
export { expect };
import { test, expect } from '@playwright/test';
import { ProductPage } from '../src/pages/ProductsPage';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Products — SauceDemo', () => {

  test('validar página de productos', async ({ page }) => {
    // 1. Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Verificar página de productos
    const productPage = new ProductPage(page);
    expect(await productPage.isPageTitleVisible()).toBe(true);
    expect(await productPage.getProductCount()).toBe(6);

    // 3. Agregar 3 productos al carrito
    await productPage.addToCart('Sauce Labs Backpack');
    await productPage.addToCart('Sauce Labs Onesie');
    await productPage.addToCart('Sauce Labs Fleece Jacket');

    // 4. Verificar que el carrito tiene 3 items
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('3');
  });
});
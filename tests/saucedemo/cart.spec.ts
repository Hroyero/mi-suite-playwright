import { test, expect } from '@playwright/test';
import { ProductPage } from '../../src/pages/ProductsPage';
import { LoginPage } from '../../src/pages/LoginPage';
import { CartPage } from '../../src/pages/CartPage';

test.describe('Cart — SauceDemo', () => {

  test('flujo completo: login → productos → carrito', async ({ page }) => {
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

    // 4. Verificar badge del carrito
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('3');

    // 5. Ir al carrito
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(page).toHaveURL(/cart/);

    // 6. Verificar items en el carrito
    expect(await cartPage.getItemCount()).toBe(3);

    // 7. Verificar nombres de productos
    const nombres = await cartPage.getItemNames();
    expect(nombres).toContain('Sauce Labs Backpack');
    expect(nombres).toContain('Sauce Labs Onesie');
    expect(nombres).toContain('Sauce Labs Fleece Jacket');
    expect(nombres).toHaveLength(3);

    await cartPage.proceedToCheckout();
  });

});
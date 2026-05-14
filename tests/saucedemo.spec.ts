// Importas TU test, no el de Playwright
import { test, expect } from '../src/fixtures/index';
import { ProductPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';

test.describe('SauceDemo con Fixtures', () => {

  // ✅ Sin login — la fixture lo hace sola
  test('ver productos después del login', async ({ loggedInPage }) => {
    const productPage = new ProductPage(loggedInPage);
    expect(await productPage.isPageTitleVisible()).toBe(true);
    expect(await productPage.getProductCount()).toBe(6);
  });

  // ✅ Sin login ni agregar productos — la fixture lo hace sola
  test('verificar carrito con productos', async ({ pageWithCart }) => {
    const cartPage = new CartPage(pageWithCart);
    await cartPage.goto();
    expect(await cartPage.getItemCount()).toBe(2);

    const nombres = await cartPage.getItemNames();
    expect(nombres).toContain('Sauce Labs Backpack');
    expect(nombres).toContain('Sauce Labs Onesie');

    await cartPage.proceedToCheckout();
  });

});
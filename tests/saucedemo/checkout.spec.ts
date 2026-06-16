import { test, expect } from '../../src/fixtures/index';
import { ProductPage } from '../../src/pages/ProductsPage';
import { CartPage } from '../../src/pages/CartPage';
import { USERS } from '../../src/data/users';

// Agregar CheckoutPage al proyecto
import { CheckoutPage } from '../../src/pages/CheckoutPage';

test.describe('Checkout E2E — SauceDemo', () => {

  test('flujo completo: login → producto → carrito → checkout → confirmación',
    async ({ loggedInPage }) => {

    // 1. Agregar producto
    const productPage = new ProductPage(loggedInPage);
    await productPage.addToCart('Sauce Labs Backpack');
    await expect(loggedInPage.getByTestId('shopping-cart-badge')).toHaveText('1');

    // 2. Ir al carrito
    const cartPage = new CartPage(loggedInPage);
    await cartPage.goto();
    await expect(loggedInPage).toHaveURL(/cart/);

    const nombres = await cartPage.getItemNames();
    expect(nombres).toContain('Sauce Labs Backpack');

    // 3. Checkout paso 1 — datos personales
    await cartPage.proceedToCheckout();
    await expect(loggedInPage).toHaveURL(/checkout-step-one/);

    const checkoutPage = new CheckoutPage(loggedInPage);
    await checkoutPage.fillPersonalInfo('David', 'Gonzalez', '12345');

    // 4. Checkout paso 2 — resumen
    await expect(loggedInPage).toHaveURL(/checkout-step-two/);
    await checkoutPage.verifyProductInSummary('Sauce Labs Backpack');

    // 5. Confirmar orden
    await checkoutPage.confirmOrder();
    await expect(loggedInPage).toHaveURL(/checkout-complete/);
    await checkoutPage.verifyOrderComplete();
  });

});
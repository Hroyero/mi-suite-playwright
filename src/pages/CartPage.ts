import { Locator, Page } from "@playwright/test";

export class CartPage {
  private readonly cartPageBtn: Locator;
  private readonly itemCount: Locator;
  private readonly itemNames: Locator;
  private readonly checkoutBtn: Locator;

  constructor(private page: Page) {
    this.cartPageBtn = page.getByTestId('shopping-cart-link');
    this.itemCount   = page.getByTestId('inventory-item');
    this.itemNames   = page.getByTestId('inventory-item-name');
    this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
  }

  async goto() {
    await this.cartPageBtn.click();
  }

  async getItemCount(): Promise<number> {
    return this.itemCount.count();
  }

  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}
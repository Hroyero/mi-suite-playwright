import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class CheckoutPage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueBtn: Locator;
  private readonly finishBtn: Locator;
  private readonly completeHeader: Locator;

  constructor(private page: Page) {
    this.firstNameInput  = page.getByTestId('firstName');
    this.lastNameInput   = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueBtn     = page.getByTestId('continue');
    this.finishBtn       = page.getByTestId('finish');
    this.completeHeader  = page.getByTestId('complete-header');
  }

  async fillPersonalInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueBtn.click();
  }

  async verifyProductInSummary(productName: string) {
    await expect(this.page.getByTestId('inventory-item-name'))
      .toContainText(productName);
  }

  async confirmOrder() {
    await this.finishBtn.click();
  }

  async verifyOrderComplete() {
    await expect(this.completeHeader)
      .toHaveText('Thank you for your order!');
  }
}
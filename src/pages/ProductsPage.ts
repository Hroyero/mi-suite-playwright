import { Locator, Page } from "@playwright/test";

export class ProductPage{
    private readonly pageTitle: Locator;
    private readonly productItems: Locator;
    
    constructor(private page:Page){
        this.pageTitle = page.getByTestId('title');
        this.productItems = page.getByTestId('inventory-item');
    }

    async getProductCount(): Promise<number> {
        // Pista: count() retorna cuántos elementos encontró el locator
        return this.productItems.count();
    }

    async addToCart(productName: string) {
        const slug = productName.toLowerCase().replace(/ /g, '-');
        await this.page.getByTestId(`add-to-cart-${slug}`).click();
    }

    async isPageTitleVisible(): Promise<boolean> {
        // Pista: isVisible() retorna true o false
        return this.pageTitle.isVisible();
       
    }
}
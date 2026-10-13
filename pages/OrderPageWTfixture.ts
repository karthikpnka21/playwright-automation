import { Page, Locator } from '@playwright/test';


export class OrderPage {
  private readonly page: Page;
  private readonly microsoftButton: Locator;
  private readonly ContinueUser: Locator;
  private readonly certificatesMenu: Locator;
  private readonly ordersMenu: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.microsoftButton = page.getByRole('button', { name: 'Microsoft' });
    this.ContinueUser = page.locator('#dashboardRedirect');
    this.certificatesMenu = page.locator(
      'a:has(span:text-is("Certificates"))'
    );

    this.ordersMenu = page.locator(
      'a[href="/manageOrders"]:text-is("Orders")'
    );
  }
  getMicrosoftButton(): Locator {
    return this.microsoftButton;
  }
  getContinueUser(): Locator {
    return this.ContinueUser;
  }
  getCertificatesMenu(): Locator {
    return this.certificatesMenu;
  }
  getOrdersMenu(): Locator {
    return this.ordersMenu;
  }
   getPage(): Page {
    return this.page;
  }
  async goToOrders(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
}
}
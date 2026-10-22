import { Page, Locator } from '@playwright/test';

export class DomainPage {
  private readonly page: Page;
  private readonly microsoftButton: Locator;
  private readonly ContinueUser: Locator;
  private readonly certificatesMenu: Locator;
  private readonly ordersMenu: Locator;
  private readonly domainsTab: Locator;

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

    this.domainsTab = page.locator('#domainsTab');
  }
  async goToOrders(): Promise<void> {
    await this.certificatesMenu.click();
    await this.ordersMenu.click();
    await this.domainsTab.click();
    await this.page.waitForLoadState('networkidle');
}
}
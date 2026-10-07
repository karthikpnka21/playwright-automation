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

  async goToOrders(organization: string): Promise<void> {
    if (this.page.url().includes('https://qa.certinext.io/loginConfirmation')) {

    await this.ContinueUser.click();

    await this.certificatesMenu.click();
    await this.ordersMenu.click();
    await this.domainsTab.click();
  }
  else if (this.page.url().includes('https://qa.certinext.io/dashboard')){

    await this.certificatesMenu.click();
    await this.ordersMenu.click();
    await this.domainsTab.click();
  }
  else if (this.page.url().includes('https://qa.certinext.io/verifyLogin?code=')) {
     await this.microsoftButton.click();

  await this.page.waitForLoadState('networkidle');

  // Check the URL before entering email/password
      const targetRow = this.page.locator('tr', {
      hasText: organization,
    });
    await targetRow.locator('button:has-text("Proceed")').click();

    await this.certificatesMenu.click();
    await this.ordersMenu.click();
    await this.domainsTab.click();
  }
}
}
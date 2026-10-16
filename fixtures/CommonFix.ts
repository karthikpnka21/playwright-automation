import { test as base, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { SCREENSHOT_PATH } from '../utils/TestData';
import { OrderPage } from '../pages/OrderPageWTfixture';
import { OrganizationPage } from '../pages/OrgPageWTfixture';
import { DomainPage } from '../pages/DomainPageWTfixture';

type OrderFixtures = {
  goToOrders: (organization: string) => Promise<void>;
  takeScreenshot: (fileName: string) => Promise<void>;
};

export const OrderBase = base.extend<OrderFixtures>({
  goToOrders: async ({ page }, use) => {
    const orderPage = new OrderPage(page);
    const microsoftButton = orderPage.getMicrosoftButton();
    const continueUser = orderPage.getContinueUser();
    const certificatesMenu = orderPage.getCertificatesMenu();
    const ordersMenu = orderPage.getOrdersMenu();

    const navigateToOrders = async (organization: string) => {
      const url = page.url();

      if (page.url().includes('https://qa.certinext.io/loginConfirmation')) {
        await continueUser.click();

      } else if (page.url().includes('https://qa.certinext.io/dashboard')){

      await page.waitForLoadState('networkidle');
    }
    else if (page.url().includes('https://qa.certinext.io/verifyLogin?code=')) {
    await microsoftButton.click();

    await page.waitForLoadState('networkidle');

  // Check the URL before entering email/password
      const targetRow = page.locator('tr', {
      hasText: organization,
    });
    await targetRow.locator('button:has-text("Proceed")').click();
    } 
    };

    await use(navigateToOrders);
  },

  takeScreenshot: async ({ page }, use) => {
    const saveScreenshot = async (fileName: string) => {
      // Create the screenshot directory if it does not exist
      await fs.mkdir(SCREENSHOT_PATH, { recursive: true });

      const screenshotFile = path.join(SCREENSHOT_PATH, fileName);

      await page.screenshot({
        path: screenshotFile,
        fullPage: true,
      });

      console.log(`Screenshot saved: ${screenshotFile}`);
    };

    await use(saveScreenshot);
  },
});

export { OrderBase as test, expect };
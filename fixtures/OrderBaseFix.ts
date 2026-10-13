import { test as base, expect } from '@playwright/test';

type OrderFixtures = {
  goToOrders: (organization: string) => Promise<void>;
};

export const OrderBase = base.extend<OrderFixtures>({
  goToOrders: async ({ page }, use) => {
    const navigateToOrders = async (organization: string) => {
      const url = page.url();

      if (url.includes('/loginConfirmation')) {
        await page.getByRole('button', { name: /continue/i }).click();

      } else if (url.includes('/verifyLogin?code=')) {
        await page.getByRole('button', { name: /microsoft/i }).click();

        await page.waitForLoadState('networkidle');

        const targetRow = page.locator('tr', {
          hasText: organization,
        });

        await targetRow
          .locator('button:has-text("Proceed")')
          .click();

      } else if (!url.includes('/dashboard')) {
        throw new Error(`Unexpected URL: ${url}`);
      }

      // Replace with your actual selectors
      await page.locator('YOUR_CERTIFICATES_SELECTOR').click();
      await page.locator('YOUR_ORDERS_SELECTOR').click();
    };

    await use(navigateToOrders);
  },
});

export { expect } from '@playwright/test';
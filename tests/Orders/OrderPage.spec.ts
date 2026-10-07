import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../utils/TestData';
import { OrderPage } from '../../pages/OrderPage';
import { OrganizationPage } from '../../pages/OrganizationPage';
import { DomainPage } from '../../pages/DomainPage';
import { SCREENSHOT_PATH } from '../../utils/TestData';
import path from 'path';

test.skip('Navigate to Orders', async ({ page }) => {

  await page.goto('/');
  
  const orderPage = new OrderPage(page);

  await orderPage.goToOrders(loginData.organization);
  /*await expect(page.locator('#ordersTab')).toBeVisible({
    timeout: 60000
  });*/
  await page.waitForTimeout(5000);
    await page.screenshot({
  path: path.join(SCREENSHOT_PATH, 'Order.png'),
});
});

test('Navigate to Organization', async ({ page }) => {
  await page.goto('/');
  
  const organizationPage = new OrganizationPage(page);
  
  await organizationPage.goToOrders(loginData.organization);
  await page.waitForTimeout(5000);
    await page.screenshot({
  path: path.join(SCREENSHOT_PATH, 'Organization.png'),
});

});

test.skip('Navigate to Domains', async ({ page }) => {

  await page.goto('/dashboard');

  const domainPage = new DomainPage(page);

  await domainPage.goToOrders(loginData.organization);
  await page.waitForTimeout(10000);
    await page.screenshot({
  path: path.join(SCREENSHOT_PATH, 'Domain.png'),
});
});


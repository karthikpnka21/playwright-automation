import { test, expect } from '../../fixtures/ScreenshotfixturePath';
import { loginData } from '../../utils/TestData';
import { OrderPage } from '../../pages/OrderPage';
import { OrganizationPage } from '../../pages/OrganizationPage';
import { DomainPage } from '../../pages/DomainPage';

test('Navigate to Orders', async ({ page, takeScreenshot }) => {

  await page.goto('/');
  
  const orderPage = new OrderPage(page);

  await orderPage.goToOrders(loginData.organization);
  await page.waitForTimeout(5000);
  await takeScreenshot('Order.png');
});

test('Navigate to Organization', async ({ page, takeScreenshot }) => {
  await page.goto('/');
  
  const organizationPage = new OrganizationPage(page);
  
  await organizationPage.goToOrders(loginData.organization);
  await page.waitForTimeout(5000);
   await takeScreenshot('Organization.png');
});

test('Navigate to Domains', async ({ page, takeScreenshot }) => {

  await page.goto('/dashboard');

  const domainPage = new DomainPage(page);

  await domainPage.goToOrders(loginData.organization);
  await page.waitForTimeout(10000);
  await takeScreenshot('Domain.png');
});

  
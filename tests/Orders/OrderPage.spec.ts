import { test } from '../../fixtures/CommonFix';
import { loginData } from '../../utils/TestData';
import { OrderPage } from '../../pages/OrderPageWTfixture';
import { OrganizationPage } from '../../pages/OrgPageWTfixture';
import { DomainPage } from '../../pages/DomainPageWTfixture';

test('Navigate to Orders', async ({ page, goToOrders, takeScreenshot }) => {

  await page.goto('/');
  await goToOrders(loginData.organization);
  const orderPage = new OrderPage(page);
  await orderPage.goToOrders();
  await page.waitForLoadState('networkidle');
  await takeScreenshot('Order.png');
});

test('Navigate to Organization', async ({ page, goToOrders, takeScreenshot }) => {
  await page.goto('/dashboard');
  
  await goToOrders(loginData.organization);
  const organizationPage  = new OrganizationPage(page);
  await organizationPage.goToOrders();
  await page.waitForLoadState('networkidle');
   await takeScreenshot('Organization.png');
});

test('Navigate to Domains', async ({ page, goToOrders, takeScreenshot }) => {

  await page.goto('/dashboard');

  await goToOrders(loginData.organization);
  const domainPage = new DomainPage(page);
  await domainPage.goToOrders();
  await page.waitForLoadState('networkidle');
  await takeScreenshot('Domain.png');
});

  
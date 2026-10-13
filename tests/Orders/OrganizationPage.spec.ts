import { OrganizationPage } from '../../pages/OrganizationPage';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../utils/TestData';
import { test, expect } from '../../fixtures/CommonFix';

test('Navigate to Organization', async ({ page }) => {

  await page.goto('/');
  
  const organizationPage = new OrganizationPage(page);

  await organizationPage.goToOrders(loginData.organization);
});

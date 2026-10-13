import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../utils/TestData';
import { DomainPage } from '../../pages/DomainPage';
import { test, expect } from '../../fixtures/CommonFix';


test('Navigate to Domains', async ({ page }) => {

  await page.goto('/dashboard');

  const domainPage = new DomainPage(page);

  await domainPage.goToOrders(loginData.organization);
});

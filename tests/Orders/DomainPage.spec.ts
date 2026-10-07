import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../utils/TestData';
import { DomainPage } from '../../pages/DomainPage';

test('Navigate to Domains', async ({ page }) => {

  await page.goto('/dashboard');

  const domainPage = new DomainPage(page);

  await domainPage.goToOrders(loginData.organization);
});

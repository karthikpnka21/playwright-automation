import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginData } from '../utils/TestData';

test('Login with Email ID and Password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToApplication();
  await loginPage.login(loginData.organization, loginData.emailid, loginData.password);
  await loginPage.selectOrganization(loginData.organization);
});
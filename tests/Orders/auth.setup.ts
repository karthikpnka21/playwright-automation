import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../utils/TestData';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  setup.setTimeout(1500000);

  const loginPage = new LoginPage(page);

  await loginPage.navigateToApplication();

  await loginPage.login(
    loginData.organization, 
    loginData.emailid,
    loginData.password
  );

  await loginPage.selectOrganization(loginData.organization);

  await page.waitForURL('**/dashboard');

  await page.context().storageState({
    path: authFile,
  });
});

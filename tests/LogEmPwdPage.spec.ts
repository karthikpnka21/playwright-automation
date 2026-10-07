import { test, expect } from '@playwright/test';
import { LogEmPwdPage } from '../pages/LogEmPwdPage';
import { loginCertinextData } from '../utils/TestData';

test('Login with valid credentials', async ({ page }) => {

  const logEmPwdPage = new LogEmPwdPage(page);

  await logEmPwdPage.navigate();
  await logEmPwdPage.loginemailpass(loginCertinextData.emailid, loginCertinextData.password);
    await logEmPwdPage.clickSignIn();
    await logEmPwdPage.isTurnstilePresent();

  // Example validation after login
  await expect(page).toHaveURL(/dashboard/);
});
import { test } from '../../fixtures/CommonFix';
import { loginData } from '../../utils/TestData';
import { ACMEApiPage } from '../../pages/APIsCred/ACMEApi';
import { RESTApiPage } from '../../pages/APIsCred/RESTApi';

test('Create ACME API Credentials', async ({ page, takeScreenshot }) => {

  await page.goto('/dashboard');
  const acmeapiPage = new ACMEApiPage(page);
  await acmeapiPage.CreateAPIcred(loginData.organization);
  await page.waitForLoadState('networkidle');
  await takeScreenshot('ACME API.png');
});

test('Create REST API Credentials', async ({ page, takeScreenshot }) => {

  await page.goto('/dashboard');
  const restapiPage = new RESTApiPage(page);
  await restapiPage.CreateAPIcred(loginData.organization);
  await page.waitForLoadState('networkidle');
  await takeScreenshot('Rest API.png');
});

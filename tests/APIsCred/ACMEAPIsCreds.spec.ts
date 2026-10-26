import { test } from '../../fixtures/CommonFix';
import { loginData } from '../../utils/TestData';
import { ACMEApiPage } from '../../pages/APIsCred/ACMEApi';
import { RESTApiPage } from '../../pages/APIsCred/RESTApi';
import { ESTApiPage } from '../../pages/APIsCred/ESTApi';
import {SCEPApiPage} from '../../pages/APIsCred/SCEPApi'
import {MyIDApiPage} from '../../pages/APIsCred/MyIDApi'

test('Create ACME API Credentials', async ({ page, takeScreenshot }) => {
  await page.goto('/dashboard');
  const acmeapiPage = new ACMEApiPage(page);
  await acmeapiPage.CreateAPIcred(loginData.organization);
  await page.waitForURL('**/acmeApi');
  await page.waitForTimeout(6000);
  await takeScreenshot('ACME API.png');
});

test('Create REST API Credentials', async ({ page, takeScreenshot }) => {
  await page.goto('/dashboard');
  const restapiPage = new RESTApiPage(page);
  await restapiPage.CreateAPIcred(loginData.organization);
  await page.waitForURL('**/acmeApi');
  await page.waitForTimeout(6000);
  await takeScreenshot('Rest API.png');
});

test('Create EST API Credentials', async ({ page, takeScreenshot }) => {
  await page.goto('/dashboard');
  const estapiPage = new ESTApiPage(page);
  await estapiPage.CreateAPIcred(loginData.organization);
  await page.waitForURL('**/acmeApi');
  await page.waitForTimeout(6000);
  await takeScreenshot('EST API.png');
});

test('Create SCEP API Credentials', async ({ page, takeScreenshot }) => {
  await page.goto('/dashboard');
  const scepapiPage = new SCEPApiPage(page);
  await scepapiPage.CreateAPIcred(loginData.organization);
  await page.waitForURL('**/acmeApi');
  await page.waitForTimeout(6000);
  await takeScreenshot('SCEP API.png');
});

test('Create MyID API Credentials', async ({ page, takeScreenshot }) => {
  test.setTimeout(100000);
  await page.goto('/dashboard');
  const myidApiPage = new MyIDApiPage(page);
  await myidApiPage.CreateAPIcred(loginData.organization);
  await page.waitForURL('**/acmeApi');
  await page.waitForTimeout(6000);
  await takeScreenshot('MyID API.png');
});
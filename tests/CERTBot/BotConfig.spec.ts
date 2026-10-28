import { test, expect } from '../../fixtures/CommonFix';
import { ConfigureBotCertstore } from '../../pages/CERTBot/CertStoreConfigBot';

test('Configuring Bot to Discover Certificates from Certificate Store', async ({ page, takeScreenshot }) => {
  test.setTimeout(150000);
  await page.goto('/dashboard');
  const configurebotcertstore = new ConfigureBotCertstore(page);
  await configurebotcertstore.ConfigureBot();
  await page.waitForURL('**/manageBot');
  await page.waitForTimeout(6000);
  await configurebotcertstore.RunScanCert();
  await takeScreenshot('RunBotCertStore.png');
  await page.waitForTimeout(30000);
  await takeScreenshot('RunBotCertStoreStatus.png');
});
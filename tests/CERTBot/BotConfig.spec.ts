import { test, expect } from '../../fixtures/CommonFix';
import { ConfigureBotCertstore } from '../../pages/CERTBot/CertStoreConfigBot';
import { ConfigureBotFileSystem } from '../../pages/CERTBot/FileSysConfBot';

test('Configuring Bot to Discover Certificates from Certificate Store', async ({ page, takeScreenshot }) => {
  test.setTimeout(150000);
  await page.goto('/dashboard');
  const configurebotcertstore = new ConfigureBotCertstore(page);
  await configurebotcertstore.configureBot();
  await page.waitForURL('**/manageBot');
  await page.waitForTimeout(6000);
  await configurebotcertstore.runScanCert();
  await takeScreenshot('RunBotCertStore.png');
  await page.waitForTimeout(30000);
  await takeScreenshot('RunBotCertStoreStatus.png');
});

test('Configuring Bot to Discover Certificates from File System', async ({ page, takeScreenshot }) => {
  test.setTimeout(150000);
  await page.goto('/dashboard');
  const configurebotfilesystem = new ConfigureBotFileSystem(page);
  await configurebotfilesystem.configureFileSysBot();
  await page.waitForURL('**/manageBot');
  await page.waitForTimeout(6000);
  await configurebotfilesystem.runScanFileSys();
  await takeScreenshot('RunBotFileSys.png');
  await page.waitForTimeout(30000);
  await takeScreenshot('RunBotFileSysStatus.png');
});


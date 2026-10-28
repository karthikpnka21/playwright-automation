import { test, expect } from '../../fixtures/CommonFix';
import { RunBotAllTargetServer } from '../../pages/CERTBot/RunScanAll';

test('Configuring Bot to Discover Certificates from Certificate Store', async ({ page, takeScreenshot }) => {
  test.setTimeout(100000);
  await page.goto('/dashboard');
  const runbotalltargetserver = new RunBotAllTargetServer(page);
  await runbotalltargetserver.runScanAllTarget();
  await takeScreenshot('RunBotAll.png');
  await page.waitForTimeout(30000);
  await takeScreenshot('RunBotAllStatus.png');
});
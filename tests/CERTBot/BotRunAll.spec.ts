import { test, expect } from '../../fixtures/CommonFix';
import { RunBotAllTargetServer } from '../../pages/CERTBot/RunBotAll';

test('Configuring Bot to Discover Certificates from Certificate Store', async ({ page, takeScreenshot }) => {
  test.setTimeout(100000);
  await page.goto('/dashboard');
  const runbotalltargetserver = new RunBotAllTargetServer(page);
  await runbotalltargetserver.RunBotAllTarget();
  await takeScreenshot('RunBotAll.png');
  await page.waitForTimeout(30000);
  await takeScreenshot('RunBotAllStatus.png');
});
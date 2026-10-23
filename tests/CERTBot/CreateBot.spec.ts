import { test, expect } from '../../fixtures/CommonFix';
import { CreateBotPage } from '../../pages/CERTBot/CreateBot';

test('Create Discovery and Provisioning Bot', async ({ page, goToOrders, takeScreenshot }) => {
  test.setTimeout(1000000);
  await page.goto('/dashboard');
  const createbotPage = new CreateBotPage(page);
  await createbotPage.CreateNewBot();
  await takeScreenshot('CreateBot.png');
});

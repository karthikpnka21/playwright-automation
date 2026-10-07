import { test, expect } from '@playwright/test';

test('Print Google languages', async ({ page }) => {
  await page.goto('https://www.google.com');

  const languages = page.locator("//div[@id='SIvCob']/a");

  const count = await languages.count();
  console.log(`Total languages: ${count}`);

  for (let i = 0; i < count; i++) {
    console.log(await languages.nth(i).innerText());
  }
});

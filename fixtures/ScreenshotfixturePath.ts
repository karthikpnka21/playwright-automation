import { test as base } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { SCREENSHOT_PATH } from '../utils/TestData';

type ScreenshotFixture = {
  takeScreenshot: (fileName: string) => Promise<void>;
};

export const test = base.extend<ScreenshotFixture>({
  takeScreenshot: async ({ page }, use) => {
    const takeScreenshot = async (fileName: string) => {
      // Create the directory if it does not exist
      await fs.mkdir(SCREENSHOT_PATH, { recursive: true });

      // Save screenshot to the configured location
      const screenshotFile = path.join(SCREENSHOT_PATH, fileName);

      await page.screenshot({
        path: screenshotFile,
        fullPage: true,
      });

      console.log(`Screenshot saved: ${screenshotFile}`);
    };

    await use(takeScreenshot);
  },
});

export { expect } from '@playwright/test';
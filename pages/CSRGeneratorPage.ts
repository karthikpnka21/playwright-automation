import { Page, Locator } from '@playwright/test';

// Import Screenshot Path from Test Data
import { SCREENSHOT_PATH } from '../utils/TestData';

export class CSRGeneratorPage {
  private readonly page: Page;
  private readonly csr: Locator;

  constructor(page: Page) {
    this.page = page;
    this.csr = page.locator('#csr');
  }

  async generateCSR(domain: string): Promise<string> {
    await this.page.goto('https://csrgenerator.com/');

    await this.page.locator('input[name="C"]').fill('US');
    await this.page.locator('input[name="ST"]').fill('Texas');
    await this.page.locator('input[name="L"]').fill('San Antonio');
    await this.page.locator('input[name="O"]').fill('My Company');
    await this.page.locator('input[name="OU"]').fill('IT');
    await this.page.locator('input[name="CN"]').fill(domain);

    await this.page.locator('input[value="2048"]').check();

    await this.page.getByRole('button', {
      name: 'Generate CSR',
    }).click();

    await this.csr.waitFor({ state: 'attached' });

    await this.page.waitForFunction(() => {
      const el = document.querySelector(
        '#csr'
      ) as HTMLTextAreaElement | HTMLInputElement | null;

      return (
        !!el &&
        el.value.includes('BEGIN CERTIFICATE REQUEST')
      );
    });

    // Take Screenshot
    await this.page.screenshot({
      path: `${SCREENSHOT_PATH}/CSR-Generated.png`,
      fullPage: true,
    });

    const csrText: string = await this.csr.inputValue();

    const csr = csrText.match(
      /-----BEGIN CERTIFICATE REQUEST-----[\s\S]*?-----END CERTIFICATE REQUEST-----/
    )?.[0]?.trim();

    if (!csr) {
      throw new Error('CSR not generated properly');
    }

    return csr;
  }
}
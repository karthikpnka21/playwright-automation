import { Page, Locator } from '@playwright/test';

export class DCVInspectorPage {
  private readonly page: Page;
  private readonly startButton: Locator;
  private readonly domain: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startButton = page.getByRole('button', {name: 'Start New Test',});
    this.domain = page.locator('code.test_domain');}

  /**
   * Open the DCV Inspector page.
   */
  async open(): Promise<void> {
    await this.page.goto(
      'https://dcv-inspector.com/test/f4fbdc5f868519ac3ed5fd56b5e3b149'
    );
  }

  /**
   * Click the Start New Test button.
   */
  async startTest(): Promise<void> {
    await this.startButton.click();
  }

  /**
   * Get the generated domain.
   */
  async getDomain(): Promise<string> {
    await this.domain.waitFor({ state: 'visible' });

    const text = await this.domain.textContent();
    return text?.trim() ?? '';
  }

  /**
   * Generate and return a new domain.
   */
  async getGeneratedDomain(): Promise<string> {
    await this.open();
    await this.startTest();

    const domain = await this.getDomain();

    if (!domain) {
      throw new Error('Domain not found');
    }

    return domain;
  }
}
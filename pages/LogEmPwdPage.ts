import { Page, Locator } from '@playwright/test';
import { loginCertinextData } from '../utils/TestData';

export class LogEmPwdPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly turnstileFrame: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.emailInput = page.locator('#emailID');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('#validateLoginCredentials');

    // Cloudflare Turnstile iframe (if present)
    this.turnstileFrame = page.locator(
      'iframe[src*="challenges.cloudflare.com"]'
    );
  }

    async navigate(): Promise<void> {
    await this.page.goto('https://qa.certinext.io/');
  }

  
async loginemailpass(emailid: string, password: string): Promise<void> {

    await this.emailInput.fill(loginCertinextData.emailid);

    await this.passwordInput.fill(loginCertinextData.password);
}
async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async isTurnstilePresent(): Promise<boolean> {
    return (await this.turnstileFrame.count()) > 0;
  }
}
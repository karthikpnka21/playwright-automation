import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly microsoftButton: Locator;
  readonly emailInput: Locator;
  readonly nextButton: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly staySignedInCheckbox: Locator;
  readonly yesButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.microsoftButton = page.getByRole('button', { name: 'Microsoft' });
    this.emailInput = page.locator('input[type="email"]');
    this.nextButton = page.locator(
      'input[type="submit"], button:has-text("Next")'
    );
    this.passwordInput = page.locator('input[type="password"]');
    this.signInButton = page.locator(
      'input[type="submit"], button:has-text("Sign in")'
    );
    this.staySignedInCheckbox = page.locator('input[type="checkbox"]');
    this.yesButton = page.locator(
      'input[type="submit"], button:has-text("Yes")'
    );
  }

  /**
   * Navigate to the application
   */
  async navigateToApplication(): Promise<void> {
    await this.page.goto('https://qa.certinext.io/');
  }

  /**
   * Login using Microsoft account
   */
  /**
 * Login using Microsoft account
 */
/**
 * Login using Microsoft account
 */
async login(organization: string, email: string, password: string): Promise<void> {
  await this.microsoftButton.click();

  await this.page.waitForLoadState('networkidle');

  // Check the URL before entering email/password
  if (this.page.url().includes('https://qa.certinext.io/verifyLogin?code=')) {
      await this.selectOrganization(organization);
      return;
    }
  await this.emailInput.fill(email);
  await this.nextButton.click();

  await this.passwordInput.fill(password);
  await this.signInButton.click();

  await this.staySignedInCheckbox.check();
  await this.yesButton.click();
  }


  /**
   * Select Organization and Proceed
   */
  async selectOrganization(organization: string): Promise<void> {
    const targetRow = this.page.locator('tr', {
      hasText: organization,
    });

    await targetRow.locator('button:has-text("Proceed")').click();
  }
}
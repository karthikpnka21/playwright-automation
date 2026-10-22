import { Page, Locator, expect } from '@playwright/test';
import { SCREENSHOT_PATH } from '../../utils/TestData';

export class TrackOrderPage {
  private readonly page: Page;

  // Domain Verification
  readonly domainVerification: Locator;
  readonly verifyLink: Locator;
  readonly dcvMethod: Locator;
  readonly copyTXTRecord: Locator;
  readonly copyDCVdomain: Locator;

  // Verification Buttons
  readonly firstButton: Locator;
  readonly verifyNowButton: Locator;
  readonly confirmationButton: Locator;

  //DCV Inspector - TXT Value Paste
  readonly txtDataInput: Locator;
  readonly addTXTRecordButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Domain Verification
    this.domainVerification = page.locator('text=6. Domain Verification');
    this.verifyLink = page.locator('a:has-text("Verify")');
    this.dcvMethod = page.locator('#selectDCVMethods');
    this.copyTXTRecord = page.locator('a.copyTxt[onclick*="dnsTargetAddr"]');
    this.copyDCVdomain = page.locator('a.copyTxt[onclick*="domainNameCopy"]');

    // Verification Buttons
    this.firstButton = page.locator('input[id$="FirstButton"]');
    this.verifyNowButton = page.locator('input[value="Verify Now"]');
    this.confirmationButton = page.locator('#msgBox12345FirstButton');

    //DCV Inspector - TXT Value Paste
    this.txtDataInput = page.locator('input[name="txt_data"]');
    this.addTXTRecordButton = page.getByRole('button', {name: 'Add TXT Record',});
  }

  /**
   * Open Track Order Page
   */
  async openTrackOrderPage(trackOrderURL: string): Promise<void> {
    await this.page.goto(trackOrderURL);
  }

  /**
   * Expand Domain Verification
   */
  async expandDomainVerification(): Promise<void> {
    await this.domainVerification.click();
  }

  /**
   * Select DNS Verification Method
   */
  async selectDNSVerificationMethod(): Promise<void> {
    await this.verifyLink.click();

    await expect(this.dcvMethod).toBeVisible();

    await this.dcvMethod.selectOption({ value: '13' });
  }

  /**
   * Copy DCV TXT Record
   */
  async getDCVTXTRecord(): Promise<string> {
    await this.copyTXTRecord.click();

    const txtValue = await this.page.evaluate(() =>
      navigator.clipboard.readText()
    );

    console.log('DCV TXT Record:', txtValue);

    await this.page.mouse.click(100, 100);

    return txtValue;
  }

  /**
   * Copy DCV Domain
   */
  async getDCVDomain(): Promise<string> {
    await this.copyDCVdomain.click();

    const domainValue = await this.page.evaluate(() =>
      navigator.clipboard.readText()
    );

    console.log('Domain:', domainValue);

    await this.page.mouse.click(100, 100);

    return domainValue;
  }

  /**
   * Add TXT Record in DCV Inspector
   */
  async openDCVPage(domainId: string) {
  await this.page.goto(`https://dcv-inspector.com/test/${domainId}`);
  }

  async addTXTRecord(txtValue: string) {
    await this.txtDataInput.fill(txtValue);
    await this.addTXTRecordButton.click();
  }

  /**
   * Verify Domain
   */
  async verifyDomain(): Promise<void> {
    await this.page.bringToFront();

    await this.verifyNowButton.click();
    await this.confirmationButton.click();
    await this.page.screenshot({path: `${SCREENSHOT_PATH}/TrackOrder.png`, fullPage: true,});
  }
}
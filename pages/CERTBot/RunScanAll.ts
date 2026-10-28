import { Page, Locator } from '@playwright/test';

export class RunBotAllTargetServer {
  private readonly page: Page;
  private readonly DiscoveryMenu: Locator;
  private readonly TotalBot: Locator;
  private readonly SelectDropdown: Locator;
  private readonly RunMenu: Locator;
  private readonly CertStoreRunScanBtn: Locator;
  private readonly RunButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.DiscoveryMenu = page.locator('a[href="/certificateDiscoveryDashboard"]');
    this.TotalBot = page.locator('a[onclick="redirectToBotGrid(\'1\')"]');
    this.SelectDropdown = page.locator('#dropdownMenuButton');
    this.RunMenu = page.getByText('Run Scan', { exact: true });
    this.CertStoreRunScanBtn = page.getByText('Select All', { exact: true });
    this.RunButton = page.locator('input[onclick="runScan()"]');
  }

  async RunScanAllTarget(): Promise<void> {
    await this.DiscoveryMenu.click();
    await this.TotalBot.click();
    await this.SelectDropdown.click();
    await this.RunMenu.click();
    await this.CertStoreRunScanBtn.click();
    await this.RunButton.click();
}
}
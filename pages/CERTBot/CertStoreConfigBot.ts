import { Page, Locator } from '@playwright/test';

export class ConfigureBotCertstore {
  private readonly page: Page;
  private readonly DiscoveryMenu: Locator;
  private readonly TotalBot: Locator;
  private readonly SelectDropdown: Locator;
  private readonly ConfigureMenu: Locator;
  private readonly EditButton: Locator;
  private readonly CertStoteSelect: Locator;
  private readonly SaveButton: Locator;
  private readonly RunMenu: Locator;
  private readonly CertStoreRunScanBtn: Locator;
  private readonly RunButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.DiscoveryMenu = page.locator('a[href="/certificateDiscoveryDashboard"]');
    this.TotalBot = page.locator('a[onclick="redirectToBotGrid(\'1\')"]');
    this.SelectDropdown = page.locator('#dropdownMenuButton');
    this.ConfigureMenu = page.getByText('Configure', { exact: true });
    this.EditButton = page.locator('i[title="Edit"]');
    this.CertStoteSelect = page.locator('#CertificateStoreCheckbox');
    this.SaveButton = page.getByRole('button', {name: 'Save',exact: true});
    this.RunMenu = page.getByText('Run Scan', { exact: true });
    this.CertStoreRunScanBtn = page.getByText('Certificate Store', { exact: true });
    this.RunButton = page.locator('input[onclick="runScan()"]');
  }

  async ConfigureBot(): Promise<void> {
    await this.DiscoveryMenu.click();
    await this.TotalBot.click();
    await this.SelectDropdown.click();
    await this.ConfigureMenu.click();
    await this.EditButton.click();

    const isSelected =await this.CertStoteSelect.isChecked();

    if (isSelected) {
    await this.SaveButton.click();
    } else {
    await this.CertStoteSelect.click();
    await this.SaveButton.click();
    }
  }
  async RunBotCert(): Promise<void> {
    await this.SelectDropdown.click();
    await this.RunMenu.click();
    await this.CertStoreRunScanBtn.click();
    await this.RunButton.click();
  }
}
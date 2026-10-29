import { Page, Locator } from '@playwright/test';
import { BotData } from '../../utils/TestData';

export class ConfigureBotFileSystem {
  private readonly page: Page;
  private readonly DiscoveryMenu: Locator;
  private readonly TotalBot: Locator;
  private readonly SelectDropdown: Locator;
  private readonly ConfigureMenu: Locator;
  private readonly EditButton: Locator;
  private readonly FileSysSelect: Locator;
  private readonly FileSysPathCheck: Locator;
  private readonly FileSysPath: Locator;
  private readonly SubFolderCheck: Locator;
  private readonly SaveButton: Locator;
  private readonly RunMenu: Locator;
  private readonly FileSysRunScanCheck: Locator;
  private readonly RunButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.DiscoveryMenu = page.locator('a[href="/certificateDiscoveryDashboard"]');
    this.TotalBot = page.locator('a[onclick="redirectToBotGrid(\'1\')"]');
    this.SelectDropdown = page.locator('#dropdownMenuButton');
    this.ConfigureMenu = page.getByText('Configure', { exact: true });
    this.EditButton = page.locator('i[title="Edit"]');
    this.FileSysSelect = page.locator('#FileSystemCheckbox');
    this.FileSysPathCheck = page.locator('#fileSystemPathEnable1');
    this.FileSysPath = page.locator('#fileSystemPath1');
    this.SubFolderCheck = page.locator('#subfolder1');
    this.SaveButton = page.getByRole('button', {name: 'Save',exact: true});
    this.RunMenu = page.getByText('Run Scan', { exact: true });
    this.FileSysRunScanCheck = page.getByText('File System', { exact: true });
    this.RunButton = page.locator('input[onclick="runScan()"]');
  }

  async configureFileSysBot(): Promise<void> {
    await this.DiscoveryMenu.click();
    await this.TotalBot.click();
    await this.SelectDropdown.click();
    await this.ConfigureMenu.click();
    await this.EditButton.click();

    const isSelected =await this.FileSysSelect.isChecked();

    if (isSelected) {
        
         const FileSysSelected= await this.FileSysPathCheck.isChecked();
        if (FileSysSelected)
        {
            const existingValue = await this.FileSysPath.inputValue();
            if (existingValue)
            {
            await this.FileSysPath.clear();
            await this.FileSysPath.fill(BotData.FilePath);
            const SubFoldChecked = await this.SubFolderCheck.isChecked();

                if (!SubFoldChecked)
                {
                await this.SubFolderCheck.check();
                }
            } else {
                await this.FileSysPath.fill(BotData.FilePath);
                const SubFoldChecked = await this.SubFolderCheck.isChecked();
                    if (!SubFoldChecked)
                    {
                    await this.SubFolderCheck.check();
                    }
            }
            } else {
            await this.FileSysPathCheck.check();
            const existingValue = await this.FileSysPath.inputValue();
            if (existingValue)
            {
            await this.FileSysPath.clear();
            await this.FileSysPath.fill(BotData.FilePath);
            const SubFoldChecked = await this.SubFolderCheck.isChecked();

                if (!SubFoldChecked)
                {
                await this.SubFolderCheck.check();
                }
            } else {
                await this.FileSysPath.fill(BotData.FilePath);
                const SubFoldChecked = await this.SubFolderCheck.isChecked();
                    if (!SubFoldChecked)
                    {
                    await this.SubFolderCheck.check();
                    }
            }
            }

        } else {
            await this.FileSysSelect.check();
            const FileSysSelected= await this.FileSysPathCheck.isChecked();
            if (FileSysSelected)
            {
            const existingValue = await this.FileSysPath.inputValue();
            if (existingValue)
            {
            await this.FileSysPath.clear();
            await this.FileSysPath.fill(BotData.FilePath);
            const SubFoldChecked = await this.SubFolderCheck.isChecked();

                if (!SubFoldChecked)
                {
                await this.SubFolderCheck.check();
                }
            } else {
                await this.FileSysPath.fill(BotData.FilePath);
                const SubFoldChecked = await this.SubFolderCheck.isChecked();
                    if (!SubFoldChecked)
                    {
                    await this.SubFolderCheck.check();
                    }
            }
            } else {
            await this.FileSysPathCheck.check();
            const existingValue = await this.FileSysPath.inputValue();
            if (existingValue)
            {
            await this.FileSysPath.clear();
            await this.FileSysPath.fill(BotData.FilePath);
            const SubFoldChecked = await this.SubFolderCheck.isChecked();

                if (!SubFoldChecked)
                {
                await this.SubFolderCheck.check();
                }
            } else {
                await this.FileSysPath.fill(BotData.FilePath);
                const SubFoldChecked = await this.SubFolderCheck.isChecked();
                    if (!SubFoldChecked)
                    {
                    await this.SubFolderCheck.check();
                    }
            }
        }
    }
    await this.SaveButton.click();
  }
  async runScanFileSys(): Promise<void> {
    await this.SelectDropdown.click();
    await this.RunMenu.click();
    await this.FileSysRunScanCheck.click();
    await this.RunButton.click();
  }
}   
import { Page, Locator, expect } from '@playwright/test';
import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export class CreateBotPage {
  private readonly page: Page;
  private readonly microsoftButton: Locator;
  private readonly ContinueUser: Locator;
  private readonly DiscoveryMenu: Locator;
  private readonly CreateBotButton: Locator;
  private readonly BotDescription: Locator;
  private readonly BotPurpose: Locator;
  private readonly SubmitorCreateBotButton: Locator;
  private readonly ViewInstruction: Locator;
  private readonly CopytoClipboard: Locator;
  private readonly ClickHereLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.microsoftButton = page.getByRole('button', { name: 'Microsoft' });
    this.ContinueUser = page.locator('#dashboardRedirect');
    this.DiscoveryMenu = page.locator('a[href="/certificateDiscoveryDashboard"]');
    this.CreateBotButton = page.locator('#create-bot-btn');
    this.BotDescription = page.locator('#tokenName');
    this.BotPurpose = page.locator('input[value="3"]');
    this.SubmitorCreateBotButton = page.locator('#finishBtn');
    this.ViewInstruction = page.locator('button[onclick*="showInstructions(\'windows\'"]').first();
    this.CopytoClipboard = page.getByRole('button', { name:'Copy to clipboard' });
    this.ClickHereLink = page.getByRole('link', { name: 'Click here' });
  }

  getMicrosoftButton(): Locator {
    return this.microsoftButton;
  }
  getContinueUser(): Locator {
    return this.ContinueUser;
  }
   getPage(): Page {
    return this.page;
  }

  
  async CreateNewBot(): Promise<void> {
    await this.DiscoveryMenu.click();
    await this.CreateBotButton.click();
    const date = new Date();
    const DDMMM = `${String(date.getDate()).padStart(2, '0')}${date.toLocaleString('en-US', { month: 'short' })}${String(date.getMinutes()).padStart(2, '0')}`;
    await this.BotDescription.fill("testBot"+DDMMM);
    await this.BotPurpose.click();
    await this.SubmitorCreateBotButton.click();
    await this.ViewInstruction.click();
    await this.page.context().grantPermissions([
        'clipboard-read',
        'clipboard-write'
    ]);
    await this.CopytoClipboard.click();
    
     const installationScript = await this.page.evaluate(
        () => navigator.clipboard.readText()
    );

    if (
        !installationScript.trim() ||
        !installationScript.includes('msiexec.exe') ||
        !installationScript.includes('Get-FileHash')
    ) {
        throw new Error(
            'Failed to retrieve valid PowerShell installation instructions.'
        );
    }

    // 2. Save the copied script to a temporary .ps1 file
    const scriptPath = path.join(
        tmpdir(),
        `install-bot-${Date.now()}.ps1`
    );

    try {
        await fs.writeFile(scriptPath, installationScript, {
            encoding: 'utf8',
            flag: 'wx'
        });

        // 3. Execute PowerShell and wait for installation to finish
        // Run the Playwright process with Administrator privileges.
        const { stdout, stderr } = await execFileAsync(
            'powershell.exe',
            [
                '-NoProfile',
                '-NonInteractive',
                '-ExecutionPolicy',
                'Bypass',
                '-File',
                scriptPath
            ],
            {
                windowsHide: true,
                timeout: 10 * 60 * 1000,
                maxBuffer: 10 * 1024 * 1024
            }
        );

        console.log('PowerShell output:\n', stdout);

        if (stderr.trim()) {
            console.warn('PowerShell stderr:\n', stderr);
        }

        if (!stdout.includes('[OK] Done!')) {
            throw new Error(
                'Installation success was not confirmed. Check the installation log.'
            );
        }

        console.log('Bot installation completed successfully.');

    await this.ClickHereLink.click();
    await this.page.waitForURL('**/manageBot');
    await this.page.waitForTimeout(3000);
    } catch (error) {
        console.error('Bot installation or navigation failed:', error);
        throw error;
    } finally {
        await fs.unlink(scriptPath).catch(() => {});
    }
}
}
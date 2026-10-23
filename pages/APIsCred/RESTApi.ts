import { Page, Locator } from '@playwright/test';
import { loginData, CertData } from '../../utils/TestData';

export class RESTApiPage {
  private readonly page: Page;
  private readonly microsoftButton: Locator;
  private readonly ContinueUser: Locator;
  private readonly IntegrationMenu: Locator;
  private readonly APIsMenu: Locator;
  private readonly createAPICredentialsButton: Locator;
  private readonly SelectAPITypeButton: Locator;
  private readonly Identifier: Locator;
  private readonly userDropdown: Locator;
  private readonly userOption: Locator;
  private readonly GroupDropdown: Locator;
  //private readonly GroupOption: Locator;
  private readonly GenerateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.microsoftButton = page.getByRole('button', { name: 'Microsoft' });
    this.ContinueUser = page.locator('#dashboardRedirect');
    this.IntegrationMenu = page.getByText('INTEGRATIONS', { exact: true });
    this.APIsMenu = page.getByText('APIs', { exact: true });
    this.createAPICredentialsButton = page.getByRole('link', {name: /Create API Credentials/});
    this.SelectAPITypeButton = page.locator('#apiType');
    this.Identifier= page.locator('#description');
    this.userDropdown = page.locator('#select2-userName-container');
    this.userOption= page.getByRole('option', {name: CertData.EmailID ,exact: false});
    this.GroupDropdown = page.locator('#groupID');
    //this.GroupOption= page.getByText(CertData.Group, { exact: true });
    this.GenerateButton=page.locator('Input[value="Generate"]');
  }

  async CreateAPIcred(organization: string): Promise<void> {
     if (this.page.url().includes('https://qa.certinext.io/loginConfirmation')) {
    await this.ContinueUser.click();
    await this.IntegrationMenu.click();
    await this.APIsMenu.click();
    await this.createAPICredentialsButton.click();
    await this.SelectAPITypeButton.click();
    await this.SelectAPITypeButton.selectOption({label: 'REST'});
    const date = new Date();
    const DDMMM = `${String(date.getDate()).padStart(2, '0')}${date.toLocaleString('en-US', { month: 'short' })}${String(date.getMinutes()).padStart(2, '0')}`;
    await this.Identifier.fill("test API"+ DDMMM )
    await this.userDropdown.click();
    await this.userOption.click();
    await this.GroupDropdown.click();
    await this.GroupDropdown.selectOption({label: CertData.Group});
    await this.GenerateButton.click();
}
else if (this.page.url().includes('https://qa.certinext.io/dashboard')){

    await this.IntegrationMenu.click();
    await this.APIsMenu.click();
    await this.createAPICredentialsButton.click();
    await this.SelectAPITypeButton.click();
    await this.SelectAPITypeButton.selectOption({label: 'REST'});
    const date = new Date();
    const DDMMM = `${String(date.getDate()).padStart(2, '0')}${date.toLocaleString('en-US', { month: 'short' })}${String(date.getMinutes()).padStart(2, '0')}`;
    await this.Identifier.fill("test API"+ DDMMM )
    await this.userDropdown.click();
    await this.userOption.click();
   await this.GroupDropdown.click();
    await this.GroupDropdown.selectOption({label: CertData.Group});
    await this.GenerateButton.click();
  }
  else if (this.page.url().includes('https://qa.certinext.io/verifyLogin?code=')) {
    await this.microsoftButton.click();

    await this.page.waitForLoadState('networkidle');

  // Check the URL before entering email/password
      const targetRow = this.page.locator('tr', {
      hasText: organization,
    });
    await targetRow.locator('button:has-text("Proceed")').click();
    
    await this.IntegrationMenu.click();
    await this.APIsMenu.click();
    await this.createAPICredentialsButton.click();
    await this.SelectAPITypeButton.click();
    await this.SelectAPITypeButton.selectOption({label: 'REST'});
    const date = new Date();
    const DDMMM = `${String(date.getDate()).padStart(2, '0')}${date.toLocaleString('en-US', { month: 'short' })}${String(date.getMinutes()).padStart(2, '0')}`;
    await this.Identifier.fill("test API"+DDMMM )
    await this.userDropdown.click();
    await this.userOption.click();
    await this.GroupDropdown.click();
    await this.GroupDropdown.selectOption({label: CertData.Group});
    await this.GenerateButton.click();
  }
}
}
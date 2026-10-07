import { Page, Locator, expect } from '@playwright/test';
import { OrgData } from '../utils/TestData';
import { SCREENSHOT_PATH } from '../utils/TestData';

export class EVOrderPage {
  private readonly page: Page;

  // Navigation
  private readonly certificatesMenu: Locator;
  private readonly ordersMenu: Locator;
  private readonly newRequestBtn: Locator;

  // Order form
  private readonly caSource: Locator;
  private readonly baseProduct: Locator;
  private readonly product: Locator;
  private readonly subscriptionRadio: Locator;
  private readonly nextButton: Locator;

  // CSR details
  private readonly csrInput: Locator;
  private readonly CSRnextButton: Locator;

  // Organization details
  private readonly orgName: Locator;
  private readonly orgUnit: Locator;
  private readonly businessCategory: Locator;
  private readonly street1: Locator;
  private readonly street2: Locator;
  private readonly country: Locator;
  private readonly state: Locator;
  private readonly locality: Locator;
  private readonly postalCode: Locator;
  private readonly OrgnextButton: Locator;

  // Account
  /*private readonly existingAccountRadio: Locator;
  private readonly accountUserDropdown: Locator;
  private readonly OrgRepnextButton: Locator;*/

  // Certificate information
  private readonly domainInput: Locator;
  private readonly dunsInput: Locator;
  private readonly CerInfnextButton: Locator;

  // Contract signer and certificate approval
  private readonly ContractSigner: Locator;
  private readonly CertificateApproval: Locator;
  private readonly AuthSignDetails: Locator;

  // Additional Information
  private readonly AdditionalInfo: Locator;

  // Payment
  private readonly paymentBtn: Locator;

  // Track Order
  readonly orderIdLabel: Locator;
  readonly orderIdValue: Locator;
  private readonly dropdownMenu: Locator;
  private readonly trackOrderMenu: Locator;
  private readonly trackOrderModal: Locator;
  private readonly copyTrackingURL: Locator;
  private readonly openURLLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.certificatesMenu = page.locator(
      'a:has(span:text-is("Certificates"))'
    );
    this.ordersMenu = page.locator(
      'a[href="/manageOrders"]:text-is("Orders")'
    );
    this.newRequestBtn = page.locator('text=New Request');

    // Order form
    this.caSource = page.locator('#caSourceSelect');
    this.baseProduct = page.locator('#baseProductId');
    this.product = page.locator('#productMasterID');
    this.subscriptionRadio = page.locator('input[type="radio"]');
    this.nextButton = page.locator(
      'input[type="button"][value="Next"]'
    );

    // CSR details
    this.csrInput = page.locator('#csrValue');
    this.CSRnextButton = page.locator(
      'input.certificateSigningRequestClass'
    );

    // Organization details
    this.orgName = page.locator('#OrganizationName1');
    this.orgUnit = page.locator('#OrganizationUnit1');
    this.businessCategory = page.locator('#BusinessCategory1');
    this.street1 = page.locator('#StreetAddress11');
    this.street2 = page.locator('#StreetAddress21');
    this.country = page.locator('#Country1');
    this.state = page.locator('#State1');
    this.locality = page.locator('#CityLocality1');
    this.postalCode = page.locator('#PostalCodePostOfficeBoxNumber1');
    this.OrgnextButton = page.locator(
      'input[onclick="manageEmsignOrder(\'orgInformation\');"]'
    );

    // Account
    /*this.existingAccountRadio = page.locator('#existingAcct');
    this.accountUserDropdown = page.locator('#selectdAcctUserID');
    this.OrgRepnextButton = page.locator(
      'input[type="button"][value="Next"][onclick="manageEmsignOrder(\'orgRepInformation\');"]'
    );*/

    // Certificate information
    this.domainInput = page.locator('#DomainName1');
    this.dunsInput = page.locator(
      '#CompanyDunsCompanyRegistrationNumber1'
    );
    this.CerInfnextButton = page.locator(
      'input[type="button"][value="Next"][onclick="manageEmsignOrder(\'CertificateInformation\');"]'
    );

    // Contract signer and certificate approval
    this.ContractSigner = page.locator('#contractSigner');
    this.CertificateApproval = page.locator('#certificateApprover');
    this.AuthSignDetails = page.locator(
      'input[onclick="manageEmsignOrder(\'authorizedSignDetails\');"]'
    );

    // Additional Information
    this.AdditionalInfo = page.locator(
      'input[onclick="manageEmsignOrder(\'additionalInformation\');"]'
    );

    // Payment
    this.paymentBtn = page.locator('#paymentBtn');

    // Track Order
    this.orderIdLabel = page.locator('label:text("Order ID")');
    this.orderIdValue = this.orderIdLabel.locator('xpath=following-sibling::div');
    this.dropdownMenu = page.locator('#dropdownMenuLink');
    this.trackOrderMenu = page.getByRole('link', {
      name: 'Track Order',
    });

    this.trackOrderModal = page.locator('#trackOrderModal');

    this.copyTrackingURL =
      this.trackOrderModal.getByTitle(
        'Copy Order Status Tracking URL'
      );

    this.openURLLink = page.getByRole('link', {
      name: /Open URL/i,
    });
  }

  async goToOrders(): Promise<void> {
    await this.certificatesMenu.click();
    await this.ordersMenu.click();
  }

  async clickNewRequest(): Promise<void> {
    await this.newRequestBtn.click();
  }

  async selectProductFlow(): Promise<void> {
    await this.caSource.selectOption({ label: 'emSign' });
    await this.baseProduct.selectOption({
      label: 'SSL/TLS Certificates',
    });
    await this.product.selectOption({
      label: 'EV SSL Certificate',
    });

    await this.subscriptionRadio.first().check();
    await this.nextButton.click();

    await this.page.waitForLoadState('networkidle');
  }

  async enterCSR(csr: string): Promise<void> {
    await expect(this.csrInput).toBeVisible();
    await this.csrInput.fill(csr);
    await this.CSRnextButton.click();
  }

  async fillOrganizationDetails(OrgName: String, OrgUnit: String, Street1: String, Street2: String, locality: String, PinCode: String): Promise<void> {
    await this.orgName.fill(OrgData.OrgName);
    await this.orgUnit.fill(OrgData.OrgUnit);
    await this.businessCategory.selectOption({
      label: 'Private Organization',
    });

    await this.street1.fill(OrgData.Street1);
    await this.street2.fill(OrgData.Street2);

    await this.country.selectOption({ label: 'India' });
    await this.state.selectOption({ label: 'Karnataka' });

    await this.locality.clear();
    await this.locality.fill(OrgData.locality);

    await this.postalCode.fill(OrgData.PinCode);
    await this.OrgnextButton.click();
  }

  /*async selectExistingAccount(): Promise<void> {
    await this.existingAccountRadio.check();

    await this.accountUserDropdown.selectOption({
      label: 'Karthik P N (karthik.pn@emudhra.com)',
    });

    await this.OrgRepnextButton.click();
  }*/

  async enterDomainAndDUNS(domain: string, DunsInput: String): Promise<void> {
    await this.domainInput.fill(domain);
    await this.dunsInput.fill(OrgData.DunsInput);
    await this.CerInfnextButton.click();
  }

  async csrSignerCertApprov(): Promise<void> {
    await this.ContractSigner.check();
    await this.CertificateApproval.check();
    await this.AuthSignDetails.click();
  }

  async AdditionalInform(): Promise<void> {
    await this.AdditionalInfo.click();
  }

  async makePayment(): Promise<void> {
    await this.paymentBtn.click();
    await this.page.waitForLoadState('networkidle');
  }
  
  async getOrderId(): Promise<string> {
    const orderId = await this.orderIdValue.textContent();
    return orderId?.trim() ?? '';
  }

  async clickActionDropdown(): Promise<void> {
    await this.dropdownMenu.click();
    await this.page.screenshot({path: `${SCREENSHOT_PATH}/ViewOrder.png`, fullPage: true,});
    await this.trackOrderMenu.click();
  }

  async copyTrackingURLFromClipboard(): Promise<string> {
    await expect(this.copyTrackingURL).toBeVisible();

    await this.copyTrackingURL.click();

    const trackingURL = await this.page.evaluate(() =>
      navigator.clipboard.readText()
    );

    console.log('Tracking URL:', trackingURL);

    return trackingURL;
  }

  async openTrackOrderPage(): Promise<Page> {
    const [trackOrderPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.openURLLink.click(),
    ]);

    await trackOrderPage.waitForLoadState();

    return trackOrderPage;
  }
}
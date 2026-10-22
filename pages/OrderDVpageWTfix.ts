import { Page, Locator, expect } from '@playwright/test';
import { CertData } from '../utils/TestData';

export class OrderDVPage {
  private readonly page: Page;
  private readonly microsoftButton: Locator;
  private readonly ContinueUser: Locator;
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

  // Certificate information
  private readonly CerInfnextButton: Locator;

  // Requestor information
  /*private readonly requestorName: Locator;
  private readonly requestorEmailID: Locator;*/
  private readonly requestorNextBtn: Locator;
  

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
    this.microsoftButton = page.getByRole('button', { name: 'Microsoft' });
    this.ContinueUser = page.locator('#dashboardRedirect');
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

    // Certificate information
    /*this.requestorName = page.locator('#requestorName');
    this.requestorEmailID = page.locator('#requestorEmailID');*/
    this.requestorNextBtn = page.locator('input[type="button"][value="Next"][onclick="manageEmsignOrder(\'CertificateRequestorInformation\');"]');

    // Certificate information
    this.CerInfnextButton = page.locator(
      'input[type="button"][value="Next"][onclick="manageEmsignOrder(\'CertificateInformation\');"]'
    );

    // Additional Information
    this.AdditionalInfo = page.locator('input[type="button"][value="Next"][onclick="manageEmsignOrder(\'additionalInformation\');"]');

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
  getMicrosoftButton(): Locator {
    return this.microsoftButton;
  }
  getContinueUser(): Locator {
    return this.ContinueUser;
  }
  getCertificatesMenu(): Locator {
    return this.certificatesMenu;
  }
  getOrdersMenu(): Locator {
    return this.ordersMenu;
  }
   getPage(): Page {
    return this.page;
  }

  async PlaceOrderDvSsl(csr: string): Promise<void> {
    await this.certificatesMenu.click();
      await this.ordersMenu.click();
    await expect(this.newRequestBtn).toBeVisible({ timeout: 10000 });
    await this.newRequestBtn.click();
    await expect(this.caSource).toBeVisible({ timeout: 20000 });
    await this.caSource.selectOption({ label: 'emSign' });
    await expect(this.baseProduct).toBeVisible({ timeout: 10000 });
    await this.baseProduct.selectOption({label: 'SSL/TLS Certificates'});
    await expect(this.baseProduct).toBeVisible({ timeout: 10000 });
    await this.product.selectOption({label: 'DV SSL Certificate'});
    await this.subscriptionRadio.first().check();
    await this.nextButton.click();
      await expect(this.csrInput).toBeVisible();
      await this.csrInput.fill(csr);
      await expect(this.CSRnextButton).toBeVisible({ timeout: 10000 });
      await this.CSRnextButton.click();
      await expect(this.requestorNextBtn).toBeVisible({ timeout: 10000 });
      /*await this.requestorName.fill(CertData.RequestorName);
      await this.requestorEmailID.fill(CertData.EmailID);*/
      await this.requestorNextBtn.click();
      await expect(this.CerInfnextButton).toBeVisible({ timeout: 10000 });
      await this.CerInfnextButton.click();
      await expect(this.AdditionalInfo).toBeVisible({ timeout: 10000 });
    await this.AdditionalInfo.click();
   await expect(this.paymentBtn).toBeVisible({ timeout: 30000 });
      await this.paymentBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
    
    async getOrderId(): Promise<string> {
      const orderId = await this.orderIdValue.textContent();
      return orderId?.trim() ?? '';
    }
  
    async clickActionDropdown(): Promise<void> {
      await this.dropdownMenu.click();
      await this.trackOrderMenu.click();
    }
  
    async copyTrackingURLFromClipboard(): Promise<string> {

      await this.page.context().grantPermissions(
    ['clipboard-read', 'clipboard-write'],
    { origin: 'https://qa.certinext.io' }
    );
    
      await expect(this.copyTrackingURL).toBeVisible();
  
      await this.copyTrackingURL.click();
  
      const trackingURL = await this.page.evaluate(() =>
        navigator.clipboard.readText()
      );
  
      console.log('Tracking URL:', trackingURL);
  
      return trackingURL;
    }
}
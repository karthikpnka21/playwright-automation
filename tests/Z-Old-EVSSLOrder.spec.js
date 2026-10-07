const { test, expect } = require('@playwright/test');
const LoginPage = require('./Z-Old-EVSSLOrder.spec.js');
const { generateCSRAndDomain } = require('./csr-generatorOld.spec.js');
test('Login with Email ID and Password', async ({ page }) => {
  // Open website
await page.goto('https://qa.certinext.io/');

  // Enter Email ID
  //await page.fill('input[name="emailID"]', 'karthik.pn@emudhra.com');- Captcha not allowing
  

  // Enter Password
  //await page.fill('input[type="password"]', 'Qatest@12');- Captcha not allowing
 

  // Click Login button
  //await page.click('button[type="button"]');
  await page.getByRole('button', { name: 'Microsoft' }).click();
  await page.waitForTimeout(4000);

  await page.fill('input[type="email"]', 'karthik.pn@emudhra.com');

  // Click Next (Email step)
  await page.click('input[type="submit"], button:has-text("Next")');

  // 3. Enter Password
  await page.fill('input[type="password"]', 'KarthiAshu@AbofRbKA21');

  // Click Next (Password step)
  await page.click('input[type="submit"], button:has-text("Sign in")');

  await page.check('input[type="checkbox"]');

  await page.click('input[type="submit"], button:has-text("Yes")');

  const targetRow = page.locator('tr', {
    hasText: 'Slidecode techn',
  });

  await targetRow.locator('button:has-text("Proceed")').click();

  await page.click('text=CERTIFICATES');

  await page.click('text=Orders');

  // -----------------------
  // Click New Request
  // -----------------------
  await page.click('text=New Request');

  // Wait for request page
  await page.waitForLoadState('networkidle');
test.setTimeout(1500000);
  // -----------------------------------
  // Select Group
  // -----------------------------------
  //await page.selectOption(
  //  'select:has-text("swizz safekeys tecnology")',
  //  { label: 'swizz safekeys tecnology' }
  //);

  // -----------------------------------
  // CA Source - emSign
  // -----------------------------------
  await page.selectOption('#caSourceSelect', {
  label: 'emSign'
  });

  // -----------------------------------
  // Certificate Type
  // -----------------------------------
  await page.selectOption(
    '#baseProductId',
    { label: 'SSL/TLS Certificates' }
  );

  // -----------------------------------
  // Product
  // -----------------------------------
  await page.selectOption(
    '#productMasterID',
    { label: 'EV SSL Certificate' }
  );

  // -----------------------------------
  // Subscription - 1 Year
  // -----------------------------------
  await page.check('input[type="radio"]');

  // -----------------------------------
  // Click Next
  // -----------------------------------
  await page.click('input[type="button"]');

  // Wait for CSR page
  await page.waitForLoadState('networkidle');


// Save reference to original page
const project1Page = page;
//Open a new tab
const csrPage = await project1Page.context().newPage();

// Generate CSR in the new tab
const { domain: domainfrmcsr, csr: csrgen } =
  await generateCSRAndDomain(csrPage);

console.log('Generated Domain:', domainfrmcsr);
console.log('Generated CSR:', csrgen);

// Close the CSR tab
await csrPage.close();

// Bring original page to front
await project1Page.bringToFront();

test.setTimeout(1500000);

// Ensure original page is ready
await expect(project1Page.locator('#csrValue')).toBeVisible({
  timeout: 60000
});

// Copy CSR from new page into original page
await project1Page.fill('#csrValue', csrgen);

await page.locator('input[onclick="manageEmsignOrder(\'certificateSigningRequest\');"]').click();

  // Organization Name
  await page.fill('#OrganizationName1', 'Technofire');

  await page.fill('#OrganizationUnit1', 'IT Department');

// Organization Unit
//await page.getByLabel('Organization Unit').fill('IT Department');

// Business Category
 await page.selectOption('#BusinessCategory1', {
  label: 'Private Organization'
  });

// Street Address 1
await page.fill('#StreetAddress11', '123 Main Street');

// Street Address 2
await page.fill('#StreetAddress21', 'Suite 400');

await page.selectOption('#Country1', {
  label: 'India'
  });

await page.selectOption('#State1', {
  label: 'Karnataka'
  });

await page.fill('#Locality1', 'Bangalore');

await page.fill('#PostalCodePostOfficeBoxNumber1', '560010');

 await page.waitForLoadState('networkidle');

await page.locator('input[onclick="manageEmsignOrder(\'orgInformation\');"]').click();

test.setTimeout(1500000);
// Select the "Existing" radio button
await page.locator('#existingAcct').check();

// Select "Karthik P N" from the dropdown
await page.locator('#selectdAcctUserID').selectOption({
  label: 'Karthik P N (karthik.pn@emudhra.com)'});


await page.locator('input[onclick="manageEmsignOrder(\'orgRepInformation\');"]').click();
await page.waitForLoadState('networkidle');

//await page.locator('#DomainName1').fill('f4fbdc5f868519ac3ed5fd56b5e3b149.test.dcv-inspector.com');
// refer domain from CSRgenerator project
await page.locator('#DomainName1').fill(domainfrmcsr);
await page.locator('#CompanyDunsCompanyRegistrationNumber1').fill('7658765432567');


await page.locator('input[onclick="manageEmsignOrder(\'CertificateInformation\');"]').click();

await page.locator('#contractSigner').check();
await page.locator('#certificateApprover').check();
await page.locator('input[onclick="manageEmsignOrder(\'authorizedSignDetails\');"]').click();


await page.locator('input[onclick="manageEmsignOrder(\'additionalInformation\');"]').click();

test.setTimeout(1500000);
//Use Credit
await page.locator('#paymentBtn').click(); 
//payOnlineBtn - Payonlie
//Save and Exit - await page.locator('input[type="button"][value="Save and Exit"]').click();
//await page.getByRole('button', { name: 'Save and Exit' }).click();
//await page.locator('input[value="Save and Exit"]').click();

// wait for View Order page to fully load
test.setTimeout(1500000);
// now dropdown exists
await page.locator('#dropdownMenuLink').waitFor({
  state: 'attached',
  timeout: 200000
});
// Open dropdown
await page.locator('#dropdownMenuLink').click();

// Click Track Order
await page.getByText('Track Order', { exact: true }).click();

// Wait for modal
//const modal = page.locator('.modal-content');
//await expect(modal).toBeVisible();

// Get URL from input directly (recommended)
await page.locator('i.fa.fa-clone[title="Copy Order Status Tracking URL"]').click();

// Read clipboard value
const clipboardValue = await page.evaluate(() => navigator.clipboard.readText());

console.log('Clipboard Value:', clipboardValue);

const ViewOrderPage = page;

//Open a new tab
const [TrackOrderpage] = await Promise.all([
  page.context().waitForEvent('page'),
  page.getByRole('link', { name: /Open URL/i }).click(),
])

await TrackOrderpage.waitForLoadState();
console.log(TrackOrderpage.url());

// Expand Domain Verification section
await TrackOrderpage.locator('text=6. Domain Verification').click();

// Wait for Verify button inside expanded section
await TrackOrderpage.locator('a:has-text("Verify")').click();

// Wait for DCV method dropdown
const dcvMethod = TrackOrderpage.locator('#selectDCVMethods');
await dcvMethod.waitFor({ state: 'visible' });

await dcvMethod.selectOption({ value: '13' });

await TrackOrderpage
  .locator('a.copyTxt[onclick*="dnsTargetAddr"]')
  .click();

const DCVtxtvalue = await TrackOrderpage.evaluate(() => navigator.clipboard.readText());

console.log('Clipboard Value:', DCVtxtvalue);

const domainId = domainfrmcsr.replace('.test.dcv-inspector.com', '');

const SubTrackpage = await page.context().newPage();

const targetUrl = `https://dcv-inspector.com/test/${domainId}`;

await SubTrackpage.goto(targetUrl);

// Enter DCV TXT value
// Click "Add TXT Record"
await SubTrackpage.locator('input[name="txt_data"]').fill(DCVtxtvalue);

await SubTrackpage.getByRole('button', {
  name: 'Add TXT Record'
}).click();

await TrackOrderpage.bringToFront();
await TrackOrderpage.waitForSelector(
  'input[id$="FirstButton"]',
  { state: 'visible', timeout: 10000 }
);
await TrackOrderpage.locator('input[id$="FirstButton"]').click();
await TrackOrderpage.locator('input[value="Verify Now"]').click();
await TrackOrderpage.locator('#msgBox12345FirstButton').click();
await TrackOrderpage.pause();
});
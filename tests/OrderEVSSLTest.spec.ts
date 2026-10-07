import { test, expect } from '@playwright/test';

import { EVOrderPage } from '../pages/OrderEVSSLPage';
import { LoginPage } from '../pages/LoginPage';
import { TrackOrderPage } from '../pages/DomainVerificationPage';
import { loginData, OrgData, csrData, OrderData } from '../utils/TestData';
import { SCREENSHOT_PATH } from '../utils/TestData';

import fs from 'fs';
import path from 'path';

const testDataPath = path.resolve(
  __dirname,
  '../utils/testData.ts'
);

test('Login with Email ID and Password', async ({ page }) => {
  test.setTimeout(1500000);

  // Login
  const loginPage = new LoginPage(page);

  await loginPage.navigateToApplication();

  await loginPage.login(
    loginData.emailid,
    loginData.password
  );

  await loginPage.selectOrganization(
    loginData.organization
  );

  // EV SSL Order Flow
  const orderEVSSL = new EVOrderPage(page);

  await orderEVSSL.goToOrders();

  await orderEVSSL.clickNewRequest();

  await orderEVSSL.selectProductFlow();

  await orderEVSSL.enterCSR(
    csrData.csr
  );

  await orderEVSSL.fillOrganizationDetails(OrgData.OrgName,OrgData.OrgUnit,OrgData.Street1,OrgData.Street2,OrgData.locality,OrgData.PinCode);

  /*await orderEVSSL.selectExistingAccount();*/

  await orderEVSSL.enterDomainAndDUNS(csrData.domain, OrgData.DunsInput);

  await orderEVSSL.csrSignerCertApprov();

  await orderEVSSL.AdditionalInform();

  await orderEVSSL.makePayment();

  const OrderID: String = await orderEVSSL.getOrderId();

  console.log('Generated Order ID:', OrderID);

  expect(OrderID).toBeTruthy();
  // Update Order ID in TestData.ts

  let FileContentOrdID: string =fs.readFileSync(testDataPath, 'utf8');

  FileContentOrdID = FileContentOrdID.replace(/OrderID:\s*'.*?'/,`OrderID: '${OrderID}'`);

  fs.writeFileSync(testDataPath,FileContentOrdID,'utf8');

  await orderEVSSL.clickActionDropdown();

  const trackUrl: string = await orderEVSSL.copyTrackingURLFromClipboard();

  expect(trackUrl).toBeTruthy();


  // Update Track Order URL in TestData.ts
  let fileContent: string =
    fs.readFileSync(testDataPath, 'utf8');

  fileContent = fileContent.replace(
    /TrackOrderURL:\s*'.*?'/,
    `TrackOrderURL: '${trackUrl}'`
  );

  fs.writeFileSync(
    testDataPath,
    fileContent,
    'utf8'
  );


  // Domain Verification Flow
  const trackOrderPage = new TrackOrderPage(page);

  await trackOrderPage.openTrackOrderPage(
    OrderData.TrackOrderURL
  );

  await trackOrderPage.expandDomainVerification();

  await trackOrderPage.selectDNSVerificationMethod();


  // Copy DCV TXT value and domain
  const txtValue: string =
    await trackOrderPage.getDCVTXTRecord();

  const dcvdomain: string =
    await trackOrderPage.getDCVDomain();

  // Extract domain ID
  const domainId: string = dcvdomain.replace('.test.dcv-inspector.com','');
  const dcvPage = await page.context().newPage();
  const dcvverifcationpage = new TrackOrderPage(dcvPage);
  await dcvverifcationpage.openDCVPage(domainId);
  await dcvverifcationpage.addTXTRecord(txtValue);

  // Verify Domain
  await trackOrderPage.verifyDomain();
  await page.screenshot({path: `${SCREENSHOT_PATH}/Track Order.png`, fullPage: true,});

  await page.pause();
});
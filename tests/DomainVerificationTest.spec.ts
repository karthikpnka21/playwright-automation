import { test } from '@playwright/test';

import { EVOrderPage } from '../pages/OrderEVSSLPage';
import { TrackOrderPage } from '../pages/Orders/DomainVerificationPage';
import { loginData, csrData, OrderData } from '../utils/TestData';

test('Domain Verification', async ({ page }) => {
  test.setTimeout(1500000);

  // Initialize Page Object
  const viewOrderPage = new EVOrderPage(page);

  // Open Track Order in new tab
  const trackOrderTab = await viewOrderPage.openTrackOrderPage();

  // Initialize Track Order Page Object
  const trackOrderPage = new TrackOrderPage(trackOrderTab);

  // Domain Verification Flow
  await trackOrderPage.expandDomainVerification();

  await trackOrderPage.selectDNSVerificationMethod();

  // Copy DCV TXT value and DCV domain
  const dcvTXTValue: string = await trackOrderPage.getDCVTXTRecord();
  const dcvdomain: string = await trackOrderPage.getDCVDomain();

  // Extract domain ID
  const domainId: string = dcvdomain.replace(
    '.test.dcv-inspector.com',
    ''
  );

  // Add TXT Record in DCV Inspector
  await trackOrderPage.addTXTRecord(dcvTXTValue);

  // Verify Domain
  await trackOrderPage.verifyDomain();

  await trackOrderTab.pause();
});
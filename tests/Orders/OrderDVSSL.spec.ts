import { test, expect } from '../../fixtures/CommonFix';
import { csrData, OrderData } from '../../utils/TestData';
import { OrderDVPage } from '../../pages/OrderDVpageWTfix';
import fs from 'fs';
import path from 'path';

const testDataPath = path.resolve(__dirname,'../../utils/testData.ts');

test.describe.serial('Order DV SSL Flow', () => {

test('Place DV SSL Certificate', async ({ page, goToOrders, takeScreenshot }) => {
  test.setTimeout(100000);
  await page.goto('/dashboard');
  const orderdvPage = new OrderDVPage(page);
  await orderdvPage.PlaceOrderDvSsl(csrData.csr);
  const OrderID: String = await orderdvPage.getOrderId();
  
    console.log('Generated Order ID:', OrderID);
  
    expect(OrderID).toBeTruthy();
    // Update Order ID in TestData.ts
  
    let FileContentOrdID: string =fs.readFileSync(testDataPath, 'utf8');
  
    FileContentOrdID = FileContentOrdID.replace(/OrderID:\s*'.*?'/,`OrderID: '${OrderID}'`);
  
    fs.writeFileSync(testDataPath,FileContentOrdID,'utf8');

  await orderdvPage.clickActionDropdown();
  const trackUrl: string = await orderdvPage.copyTrackingURLFromClipboard();
  
    expect(trackUrl).toBeTruthy();
  
  
    // Update Track Order URL in TestData.ts
    let fileContent: string = fs.readFileSync(testDataPath, 'utf8');
  
    fileContent = fileContent.replace(/TrackOrderURL:\s*'.*?'/,`TrackOrderURL: '${trackUrl}'`);
  
    fs.writeFileSync(testDataPath,fileContent,'utf8');

  await page.waitForLoadState('networkidle');
  await takeScreenshot('DVOrder.png');
  console.log('Track URL and Order ID Saved to Test Data file:', OrderData.TrackOrderURL, OrderData.OrderID);
});

test('Open Track Order', async ({ page, goToOrders, takeScreenshot }) => {
  await page.goto(OrderData.TrackOrderURL);
  await page.waitForLoadState('networkidle');
  await takeScreenshot('DVTrackOrder.png');
});

});
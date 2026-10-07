import { test, expect } from '@playwright/test';
import { DCVInspectorPage } from '../pages/DCVInspectorPage';
import { CSRGeneratorPage } from '../pages/CSRGeneratorPage';
import * as fs from 'fs';
import * as path from 'path';

const testDataPath = path.resolve(__dirname, '../utils/testData.ts');

test('Generate CSR using domain from DCV Inspector', async ({ page }) => {
  const dcvInspector = new DCVInspectorPage(page);
  const csrGenerator = new CSRGeneratorPage(page);

  const domain = await dcvInspector.getGeneratedDomain();
  const csr = await csrGenerator.generateCSR(domain);

  expect(domain).toBeTruthy();
  expect(csr).toContain('BEGIN CERTIFICATE REQUEST');

  let fileContent = fs.readFileSync(testDataPath, 'utf8');

  fileContent = fileContent.replace(
    /domain:\s*'.*'/,
    `domain: '${domain}'`
  );

  fileContent = fileContent.replace(
    /csr:\s*['`][\s\S]*?['`]/,
    `csr: \`${csr}\``
  );

  fs.writeFileSync(testDataPath, fileContent);

  console.log('TestData.ts updated successfully');
  console.log(`Domain: ${domain}`);
  console.log(csr);
  console.log('New Domain and New CSR Generated Successfully');
});
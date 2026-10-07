import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { OrderPage } from '../pages/OrderPage';
import { OrganizationPage } from '../pages/OrganizationPage';
import { DomainPage } from '../pages/DomainPage';

type Fixtures = {
  loginPage: LoginPage;
  orderPage: OrderPage;
  organizationPage: OrganizationPage;
  domainPage: DomainPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },

  organizationPage: async ({ page }, use) => {
    await use(new OrganizationPage(page));
  },

  domainPage: async ({ page }, use) => {
    await use(new DomainPage(page));
  },
});

export { expect };

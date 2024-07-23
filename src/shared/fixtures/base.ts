
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { AccountPage } from '../pages/accountPage';

// Declare the types of your fixtures.
type MyFixtures = {
    loginPage: LoginPage;
    accountPage: AccountPage
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.login();
        
        // Use the fixture value in the test.
        await use(loginPage);
    },
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    }
});
export { expect } from '@playwright/test';
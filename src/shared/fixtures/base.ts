
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

// Declare the types of your fixtures.
type MyFixtures = {
    loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        // Use the fixture value in the test.
        await use(new LoginPage(page));
    },
});
export { expect } from '@playwright/test';
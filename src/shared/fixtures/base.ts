
import { test as base } from '@playwright/test';
import { AccountPage } from '../pages/accountPage';
import { LoginPage } from '../pages/loginPage';
import { pageUtils } from '../utils/pageUtils';

// Declare the types of your fixtures.
type MyFixtures = {
    loginPage: LoginPage;
    accountPage: AccountPage;
    pageUtils: pageUtils;
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
    },
    pageUtils:  async ({ page }, use) => {
        await use(new pageUtils(page));
    },
});
export { expect } from '@playwright/test';


// export const test = baseTest.extend<{}, { workerStorageState: string }>({
//   // Use the same storage state for all tests in this worker.
//   storageState: ({ workerStorageState }, use) => use(workerStorageState),

//   // Authenticate once per worker with a worker-scoped fixture.
//   workerStorageState: [async ({ browser }, use) => {
//     // Use parallelIndex as a unique identifier for each worker.
//     const id = test.info().parallelIndex;
//     const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

//     if (fs.existsSync(fileName)) {
//       // Reuse existing authentication state if any.
//       await use(fileName);
//       return;
//     }

//     // Important: make sure we authenticate in a clean environment by unsetting storage state.
//     const page = await browser.newPage({ storageState: undefined });

//     // Acquire a unique account, for example create a new one.
//     // Alternatively, you can have a list of precreated accounts for testing.
//     // Make sure that accounts are unique, so that multiple team members
//     // can run tests at the same time without interference.
//     const account = await acquireAccount(id);

//     // Perform authentication steps. Replace these actions with your own.
//     await page.goto('https://github.com/login');
//     await page.getByLabel('Username or email address').fill(account.username);
//     await page.getByLabel('Password').fill(account.password);
//     await page.getByRole('button', { name: 'Sign in' }).click();
//     // Wait until the page receives the cookies.
//     //
//     // Sometimes login flow sets cookies in the process of several redirects.
//     // Wait for the final URL to ensure that the cookies are actually set.
//     await page.waitForURL('https://github.com/');
//     // Alternatively, you can wait until the page reaches a state where all cookies are set.
//     await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

//     // End of authentication steps.

//     await page.context().storageState({ path: fileName });
//     await page.close();
//     await use(fileName);
//   }, { scope: 'worker' }],
// });
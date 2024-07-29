
import { test as base } from '@playwright/test';
import { AccountPage } from '../pages/accountPage';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages/loginPage';
import { SubmissionPage } from '../pages/submissionPage';
import { PageUtils } from '../utils/pageUtils';
import { ReadAndWriteExcel } from '../utils/read_and_write_excel';


// Declare the types of your fixtures.
type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    accountPage: AccountPage;
    pageUtils: PageUtils;
    readAndWriteExcel: ReadAndWriteExcel;
    submissionPage: SubmissionPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.login();
        
        // Use the fixture value in the test.
        await use(loginPage);
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
    submissionPage: async ({ page }, use) => {
        await use(new SubmissionPage(page));
    },
    pageUtils:  async ({ page }, use) => {
        await use(new PageUtils(page));
    },
    readAndWriteExcel:  async ({ page }, use) => {
        await use(new ReadAndWriteExcel('Account Creation', 'src/shared/data/Book1.xlsx'));
    },
});
export { expect } from '@playwright/test';


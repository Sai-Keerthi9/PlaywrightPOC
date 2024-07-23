import accountDetails from '../shared/data/accountDetails.json';
import { expect, test } from '../shared/fixtures/base';

test('Test to Enter Both Person and Company Details', async ({ loginPage, accountPage, page }) => {
   
    await page.goto('/');

    await accountPage.accountSubMenu().click();
    await accountPage.selectDropdown('New Account');

    await accountPage.company().fill(accountDetails.negTC_both.company);
    await accountPage.firstName().fill(accountDetails.negTC_both.firstName);
    await accountPage.lastName().fill(accountDetails.negTC_both.lastName);

    await accountPage.searchButton().click();
    await page.waitForTimeout(2000);
    await expect(await accountPage.errorMessage()).toHaveText(accountDetails.negTC_both.errorMsg);

})
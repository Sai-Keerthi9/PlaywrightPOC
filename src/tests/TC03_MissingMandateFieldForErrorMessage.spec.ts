import { test, expect } from '../shared/fixtures/base.ts';
import accountDetails from '../shared/data/accountDetails.json';
import loginData from '../shared/data/loginData.json';


test('Mandate Field Filled Check', async ({ loginPage, accountPage, page }) => {
   
    await page.goto(loginData.URL);
    await accountPage.accountSubMenu().click();
    await accountPage.dropdown().click();

    await accountPage.firstName().click();
    await accountPage.firstName().fill(accountDetails.firstName);
    await accountPage.lastName().fill(accountDetails.lastName);

    Promise.all([
        page.waitForLoadState('networkidle'),
        accountPage.searchButton().click()
    ])

    await accountPage.createAccount().scrollIntoViewIfNeeded();
    await accountPage.createAccount().click();
    await accountPage.accountType().click();
    await accountPage.updateButton().click();
    await page.pause();
    expect(await accountPage.missingFieldErrorMessage().nth(0).textContent()).toBe(accountDetails.errorCodeMissingFilel)

})
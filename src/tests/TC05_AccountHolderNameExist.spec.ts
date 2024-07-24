import { test, expect } from '../shared/fixtures/base.ts';
import accountDetails from '../shared/data/accountDetails.json';
import loginData from '../shared/data/loginData.json';


test('Name Of The Account Holder Already Exist', async ({ loginPage, accountPage, page }) => {
   
    await page.goto(loginData.URL);
    await accountPage.accountSubMenu().click();
    await accountPage.dropdown().click();

    await accountPage.firstName().click()
    await accountPage.firstName().fill(accountDetails.firstName);
    await accountPage.lastName().fill(accountDetails.lastName);
    
    Promise.all([
        page.waitForLoadState('load'),
        accountPage.searchButton().click()
    ])

    expect(await accountPage.createdAccountName().textContent()).toBe(accountDetails.firstName+" "+accountDetails.lastName)
})
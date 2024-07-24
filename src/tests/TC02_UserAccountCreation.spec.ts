import { test, expect } from '../shared/fixtures/base.ts';
import accountDetails from '../shared/data/accountDetails.json';
import loginData from '../shared/data/loginData.json';


test('Account Creation', async ({ loginPage, accountPage, page }) => {
   
    await page.goto(loginData.URL);
    await accountPage.accountSubMenu().click();
    await accountPage.dropdown().click();

    await accountPage.firstName().click();
    await accountPage.firstName().fill(accountDetails.firstName);
    await accountPage.lastName().fill(accountDetails.lastName);

    await accountPage.country().selectOption(accountDetails.country);
    await page.waitForLoadState('networkidle');
    await accountPage.city().fill(accountDetails.town);
    await accountPage.postalCode().fill(accountDetails.postalCode);

    Promise.all([
        page.waitForLoadState('networkidle'),
        accountPage.searchButton().click()
    ])

    await accountPage.createAccount().scrollIntoViewIfNeeded();
    await accountPage.createAccount().click();
    await accountPage.accountType().click();

    await accountPage.addressLine1().click()
    await accountPage.addressLine1().fill(accountDetails.addressLine1);
    await accountPage.addressType().selectOption(accountDetails.addressType);
    await accountPage.orgSearch().click();
    await page.waitForLoadState('networkidle')
 
    await accountPage.organization().fill(accountDetails.organization);
    await accountPage.orgNameSearch().click()
    await accountPage.orgSelect().click()

    await page.waitForLoadState('networkidle')
    await accountPage.producerCode().selectOption(accountDetails.producerCode)
    await accountPage.updateButton().click()

    await page.waitForLoadState('networkidle')
    await page.pause();
    expect(await accountPage.accountHolderPostCreation().textContent()).toBe(accountDetails.firstName+" "+accountDetails.lastName)
    
})





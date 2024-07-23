import { test, expect } from '../shared/fixtures/base.ts';
import accountDetails from '../shared/data/accountDetails.json';

test('Account Creation', async ({ loginPage, accountPage, page }) => {
   
    await page.goto('/');

    await accountPage.accountSubMenu().click();
    await accountPage.selectDropdown('New Account');

    await accountPage.firstName().fill(accountDetails.firstName);
    await accountPage.lastName().fill(accountDetails.lastName);

    await accountPage.country().selectOption(accountDetails.country);
    await page.waitForTimeout(1000);
    await accountPage.city().fill(accountDetails.town);
    await accountPage.postalCode().fill(accountDetails.postalCode);

    await accountPage.searchButton().click();
    await page.waitForTimeout(2000);
    await accountPage.createAccount().scrollIntoViewIfNeeded();
    await accountPage.createAccount().click();
    await accountPage.selectDropdown('Person');

    await accountPage.addressLine1().fill(accountDetails.addressLine1);
    await accountPage.addressType().selectOption(accountDetails.addressType);
    await accountPage.organization().fill(accountDetails.organization);
    await accountPage.orgSearch().click();

    
    await page.waitForLoadState('networkidle');
    await accountPage.updateButton().click();

})
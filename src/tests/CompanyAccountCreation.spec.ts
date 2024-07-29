import accountDetails from '../shared/data/accountDetails.json';
import { expect, test } from '../shared/fixtures/base.ts';

test.describe('Account Creation for Company', ()=> {
    test('Account Creation with UK data', async ({ loginPage, pageUtils, accountPage, page, readAndWriteExcel }) => {
        await page.goto('/pc/PolicyCenter.do');
        await accountPage.accountSubMenu().click();
        await pageUtils.selectDropdown('New Account');
    
        await page.waitForLoadState('networkidle');
        await accountPage.company().fill(await readAndWriteExcel.readValue('CompanyName'));

        await accountPage.searchButton().click()
        await page.waitForLoadState('networkidle')
        
        await accountPage.createAccount().scrollIntoViewIfNeeded();
        await accountPage.createAccount().click();
        await pageUtils.selectDropdown(await readAndWriteExcel.readValue('account'));
        
        await accountPage.officePhone().fill(await readAndWriteExcel.readValue('companyOfficePhone'));
        await accountPage.primaryEmail().fill(await readAndWriteExcel.readValue('companyPrimaryEmail'));
        
        await page.waitForLoadState('load');
        const responsePromise = page.waitForResponse(response =>
            response.url() === 'http://localhost:8180/pc/PolicyCenter.do' && response.status() === 200
                && response.request().resourceType() === 'fetch'
        );
        await accountPage.country().nth(0).selectOption(await readAndWriteExcel.readValue('companyCountry'))
        await responsePromise;
        
        await accountPage.addressLine1().fill(await readAndWriteExcel.readValue('companyAddress1'));
        await accountPage.city().fill(await readAndWriteExcel.readValue('companyTown'));
        await page.waitForLoadState('networkidle')
            
        await accountPage.postalCode().fill(await readAndWriteExcel.readValue('companyPostalCode'))
            
        await accountPage.addressType().selectOption(await readAndWriteExcel.readValue('companyAddressType'));
        await accountPage.orgType().selectOption(await readAndWriteExcel.readValue('companyOrgType'));
            
        await accountPage.orgSearch().click();
        await page.waitForLoadState('networkidle')
        await accountPage.organization().fill(await readAndWriteExcel.readValue('organization'));
        await accountPage.orgNameSearch().click()
        await accountPage.orgSelect().click()
        await page.waitForLoadState('networkidle')
        
        await accountPage.producerCode().selectOption(await readAndWriteExcel.readValue('producerCode'))

        await accountPage.updateButton().click()
        await page.waitForLoadState('networkidle')
        
        await expect(await accountPage.accountHolderPostCreation()).toHaveText(await readAndWriteExcel.readValue('CompanyName'))
    })
    test('Account Creation with US data', async ({ loginPage, accountPage, page }) => {
        await page.goto('/pc/PolicyCenter.do');
        
        let accNumber = await accountPage.createNewAccount(accountDetails.companyAccountUS);
        console.log(accNumber);
    })
})
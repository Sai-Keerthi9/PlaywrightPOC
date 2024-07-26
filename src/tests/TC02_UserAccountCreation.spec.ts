import accountDetails from '../shared/data/accountDetails.json';
import loginData from '../shared/data/loginData.json';
import { expect, test } from '../shared/fixtures/base.ts';


test.describe('Account Creation for Person', ()=> {
    test('Account Creation with full data', async ({ loginPage, accountPage, pageUtils, page, readAndWriteExcel}) => {

        const value = await readAndWriteExcel.readValue('firstName')
        console.log(value)
        
        await page.goto('/pc/PolicyCenter.do');
        await accountPage.accountSubMenu().click();
        await pageUtils.selectDropdown('New Account');
    
        await accountPage.firstName().click();
        await accountPage.firstName().fill(await readAndWriteExcel.readValue('firstName'));
        await accountPage.lastName().fill(accountDetails.lastName);
    
        await accountPage.country().selectOption(accountDetails.country);
        await page.waitForLoadState('networkidle');
        await accountPage.city().fill(accountDetails.town);
        await accountPage.postalCode().fill(accountDetails.postalCode);
       
        await accountPage.searchButton().click()
        await page.waitForLoadState('networkidle')

        await accountPage.createAccount().scrollIntoViewIfNeeded();
        await accountPage.createAccount().click();
        await pageUtils.selectDropdown(accountDetails.accountType);
    
        await accountPage.homePhone().fill(accountDetails.homePhone);
        await accountPage.workPhone().fill(accountDetails.workPhone);
        await accountPage.mobilePhone().fill(accountDetails.mobilePhone); 
        await accountPage.primaryPhone().selectOption(accountDetails.primaryPhone);
        await accountPage.primaryEmail().fill(accountDetails.primaryEmail);

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
        
        Promise.all([
            page.waitForLoadState('networkidle'),
            accountPage.updateButton().click()
        ])
        await page.pause()
        await expect(await accountPage.accountHolderPostCreation()).toHaveText(accountDetails.firstName+" "+accountDetails.lastName)
        
    })
    test('Mandate Field Filled Check', async ({ loginPage, pageUtils, accountPage, page }) => {
   
        await page.goto('/pc/PolicyCenter.do');
        await accountPage.accountSubMenu().click();
        await pageUtils.selectDropdown('New Account');
    
        await accountPage.firstName().click();
        await accountPage.firstName().fill(accountDetails.firstName);
        await accountPage.lastName().fill(accountDetails.lastName);
    
        await accountPage.searchButton().click()
        await page.waitForLoadState('networkidle')
    
        await accountPage.createAccount().scrollIntoViewIfNeeded();
        await accountPage.createAccount().click();
        await pageUtils.selectDropdown(accountDetails.accountType);
        await accountPage.updateButton().click();
        
        await expect(accountPage.missingFieldErrorMessage().first()).toHaveText(accountDetails.errorCodeMissingFilel)
    
    })
    test('Name Of The Account Holder Already Exist', async ({ loginPage, pageUtils, accountPage, page }) => {
   
        await page.goto('/pc/PolicyCenter.do');
        await accountPage.accountSubMenu().click();
        await pageUtils.selectDropdown('New Account');
    
        await accountPage.firstName().click()
        await accountPage.firstName().fill(accountDetails.firstName);
        await accountPage.lastName().fill(accountDetails.lastName);
        
        await accountPage.searchButton().click()
        await page.waitForLoadState('networkidle')
    
        await expect(accountPage.createdAccountName()).toHaveText(accountDetails.firstName+" "+accountDetails.lastName)
    })
    test('Test to Enter Both Person and Company Details', async ({ loginPage, pageUtils, accountPage, page }) => {
       
        await page.goto('/pc/PolicyCenter.do');
        await accountPage.accountSubMenu().click();
        await await pageUtils.selectDropdown('New Account');('New Account');
    
        await accountPage.company().click()
        await accountPage.company().fill(accountDetails.negTC_both.company);
        await accountPage.firstName().fill(accountDetails.firstName);
        await accountPage.lastName().fill(accountDetails.lastName);
    
        await accountPage.searchButton().click()
        await page.waitForLoadState('networkidle')
        
        await expect(await accountPage.errorMessage()).toHaveText(accountDetails.negTC_both.errorMsg);
    
    })
})


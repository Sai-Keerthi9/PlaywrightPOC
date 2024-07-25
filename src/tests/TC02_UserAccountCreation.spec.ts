import accountDetails from '../shared/data/accountDetails.json';
import loginData from '../shared/data/loginData.json';
import { expect, test } from '../shared/fixtures/base.ts';
import { ReadAndWriteExcel } from '../shared/utility/read_and_write_excel.ts';

const readAndWriteExcel = new ReadAndWriteExcel('Account Creation', 'C:\Users\nipannee\PlaywrightPOC\src\shared\data\Book1.xlsx')

test.describe('Account Creation', ()=> {
    test.only('Account Creation with full data', async ({ loginPage, accountPage, page }) => {

        // const value = await readAndWriteExcel.readValue('firstName')
        // console.log(value)

        await page.pause()
        await page.goto(loginData.URL);
        await accountPage.accountSubMenu().click();
        await accountPage.selectDropdown('New Account');
    
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
        await accountPage.selectDropdown(accountDetails.accountType);
    
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
    
        await expect(await accountPage.accountHolderPostCreation()).toHaveText(accountDetails.firstName+" "+accountDetails.lastName)
        
    })
    test('Mandate Field Filled Check', async ({ loginPage, accountPage, page }) => {
   
        await page.goto(loginData.URL);
        await accountPage.accountSubMenu().click();
        await accountPage.selectDropdown('New Account');
    
        await accountPage.firstName().click();
        await accountPage.firstName().fill(accountDetails.firstName);
        await accountPage.lastName().fill(accountDetails.lastName);
    
        Promise.all([
            page.waitForLoadState('networkidle'),
            accountPage.searchButton().click()
        ])
    
        await accountPage.createAccount().scrollIntoViewIfNeeded();
        await accountPage.createAccount().click();
        await accountPage.selectDropdown(accountDetails.accountType);
        await accountPage.updateButton().click();
        
        await expect(accountPage.missingFieldErrorMessage().first()).toHaveText(accountDetails.errorCodeMissingFilel)
    
    })
    test('Name Of The Account Holder Already Exist', async ({ loginPage, accountPage, page }) => {
   
        await page.goto(loginData.URL);
        await accountPage.accountSubMenu().click();
        await accountPage.selectDropdown('New Account');
    
        await accountPage.firstName().click()
        await accountPage.firstName().fill(accountDetails.firstName);
        await accountPage.lastName().fill(accountDetails.lastName);
        
        Promise.all([
            page.waitForLoadState('load'),
            accountPage.searchButton().click()
        ])
    
        await expect(accountPage.createdAccountName()).toHaveText(accountDetails.firstName+" "+accountDetails.lastName)
    })
    test('Test to Enter Both Person and Company Details', async ({ loginPage, accountPage, page }) => {
       
        await page.goto(loginData.URL);
        await accountPage.accountSubMenu().click();
        await accountPage.selectDropdown('New Account');
    
        await accountPage.company().click()
        await accountPage.company().fill(accountDetails.negTC_both.company);
        await accountPage.firstName().fill(accountDetails.firstName);
        await accountPage.lastName().fill(accountDetails.lastName);
    
       Promise.all([
            page.waitForLoadState('load'),
            accountPage.searchButton().click()
        ])
        
        await expect(await accountPage.errorMessage()).toHaveText(accountDetails.negTC_both.errorMsg);
    
    })
})


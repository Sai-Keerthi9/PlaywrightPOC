import loginData from '../shared/data/loginData.json';
import { test } from '../shared/fixtures/base.ts';

test.describe.skip('Create Policy', ()=> {
    test('Create D&O Policy', async ({ loginPage, pageUtils, accountPage, page }) => {
        
        await page.goto(loginData.URL);
        await accountPage.accountSubMenu().click();
        await pageUtils.selectDropdown('New Account');
    
    })
})
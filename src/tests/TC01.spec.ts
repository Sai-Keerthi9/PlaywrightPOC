import { test, expect } from '../shared/fixtures/base.ts';
import loginData from '../shared/data/loginData.json';

test('Successful login', async ({ loginPage, page }) => {
   
    await page.goto('/');
    await loginPage.username().fill(loginData.userName);
    await loginPage.password().fill(loginData.password);
    await loginPage.loginButton().click();

    await page.waitForLoadState('networkidle')
    await expect(page.locator('div.gw-TitleBar--title')).toBeVisible();
    
})


test.only('Failed login', async ({loginPage, page})=>{

    await page.goto('/');
    await loginPage.username().fill(loginData.inCorrectUsername);
    await loginPage.password().fill(loginData.inCorrectPassword);
    await loginPage.loginButton().click();
    await loginPage.loginButton()
    expect(await loginPage.errorMessage().textContent()).toBe(loginData.errorMessage)

})
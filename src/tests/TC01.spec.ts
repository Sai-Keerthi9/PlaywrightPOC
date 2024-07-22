import { test, expect } from '../shared/fixtures/base.ts';
import loginData from '../shared/data/loginData.json';

test('Login', async ({ loginPage, page }) => {
   
    await page.goto('/');
    await page.locator(loginPage.username).fill(loginData.userName);
    await page.locator(loginPage.password).fill(loginData.password);
    await page.locator(loginPage.loginButton).click();
    
    await page.waitForSelector('div.gw-TitleBar--title');
    await expect(page.locator('div.gw-TitleBar--title')).toBeVisible();
    
})
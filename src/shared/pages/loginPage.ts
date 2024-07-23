import { expect, Locator, Page } from "@playwright/test";
import loginData from '../data/loginData.json';

const authFile = 'playwright/.auth/user.json';
export class LoginPage {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }
     
    username() : Locator {return this.page.locator('input[name="Login-LoginScreen-LoginDV-username"]');}
    password() : Locator{return this.page.locator('input[type="password"]');}
    loginButton() : Locator{return this.page.locator('div[aria-label="Log In"]');}
    errorMessage() : Locator{return this.page.locator('#Login-LoginScreen-LoginFormMessage div')}


    async login() {
        await this.page.goto('/');
        await this.username().fill(loginData.userName);
        await this.password().fill(loginData.password);
        await this.loginButton().click();
        
        await this.page.waitForSelector('div.gw-TitleBar--title');
        await expect(this.page.locator('div.gw-TitleBar--title')).toBeVisible();
    }
}
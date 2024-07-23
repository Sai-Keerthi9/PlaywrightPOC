import { Locator, Page } from "@playwright/test";

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

}
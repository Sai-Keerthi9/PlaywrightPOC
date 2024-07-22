import { Locator, Page } from "@playwright/test";

const authFile = 'playwright/.auth/user.json';
export class LoginPage {
    public page: Page;
    readonly username: string;
    readonly password: string;
    readonly loginButton: string;

    constructor(page: Page) {
        this.page = page;
        this.username = 'input[name="Login-LoginScreen-LoginDV-username"]';
        this.password = 'input[type="password"]';
        this.loginButton = 'div[aria-label="Log In"]';
    }
}
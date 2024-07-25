import { Locator, Page } from "@playwright/test";

export class submissionPage {
    page : Page
    readonly expandButton : string;

    constructor(page: Page) {
        this.page = page;
        this.expandButton = 'div[class="gw-icon gw-icon--expand"]';
    }

    desktop(): Locator {
        return this.page.locator('div[id="TabBar-DesktopTab"]')
    }
    account(): Locator {
        return this.page.locator('div[id="TabBar-AccountTab"]')
    }
    policy(): Locator {
        return this.page.locator('div[id="TabBar-PolicyTab"]')
    }
    pageTitle(): Locator {
        return this.page.locator('div[class="gw-TitleBar--title"]');
    }
    

    actions(): Locator {return this.page.locator('div[role="button"][aria-label="Actions"]')}
}
import { Locator, Page } from "@playwright/test";

export class AccountPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    account(): Locator{return this.page.locator('div[id="TabBar-AccountTab"]');}
    accountSubMenu(): Locator{return this.page.locator('div[id="TabBar-AccountTab"] div[data-gw-click="toggleSubMenu"]')}
    dropdown(): Locator{return this.page.locator('div[class="gw-subMenu gw-open"][role="menu"]');}
    errorMessage(): Locator{return this.page.locator('div[class*="gw-MessagesWidget--group-error"] div[class="gw-message"]');}
    
    company(): Locator{return this.page.locator('div[id*="GlobalContactNameInputSet"] input');}
    firstName():Locator {return this.page.locator('input[name*="FirstName"][type="text"]');}
    lastName():Locator {return this.page.locator('input[name*="LastName"][type="text"]');}
    country():Locator {return this.page.locator('select[name*="Country"]');}
    city():Locator {return this.page.locator('input[name*="City"][type="text"]');}
    postalCode():Locator {return this.page.locator('input[name*="PostalCode"][type="text"]');}
    searchButton():Locator {return this.page.getByRole('button', { name: 'Search' });}
    createAccount():Locator {return this.page.locator('div[id*="NewAccountButton"] div[role="button"]');}
    addressLine1():Locator {return this.page.getByLabel('Address 1');}
    addressType():Locator {return this.page.getByLabel('Address Type');}
    organization():Locator {return this.page.getByLabel('Organization', { exact: true });}
    orgSearch():Locator {return this.page.getByLabel('Select Organization...');}
    updateButton():Locator {return this.page.getByRole('button', { name: 'Update' });}

    detailsTitle(): Locator {return this.page.locator('div[aria-label="Details"] span[class="gw-TitleText"]')}
    accountHolder(): Locator {return this.page.locator('div[id*="AccountHolder_Input"] div[data-gw-getset="text"]')}

    async selectDropdown(value: string) {
        await this.dropdown().getByLabel(value).click();
    }

}
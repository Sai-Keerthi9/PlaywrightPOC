import { Locator, Page } from "@playwright/test";

export class AccountPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    account(): Locator{return this.page.locator('div[id="TabBar-AccountTab"]');}
    accountSubMenu(): Locator{return this.page.locator('div[id="TabBar-AccountTab"] div[data-gw-click="toggleSubMenu"]')}
    dropdown(): Locator{return this.page.locator('div[class*=gw-subMenu] #TabBar-AccountTab-AccountTab_NewAccount');}
    errorMessage(): Locator{return this.page.locator('div[class*="gw-MessagesWidget--group-error"] div[class="gw-message"]');}
    missingFieldErrorMessage(): Locator{return this.page.locator('div .gw-message');}
    
    company(): Locator{return this.page.locator('div[id*="GlobalContactNameInputSet"] input');}
    firstName():Locator {return this.page.locator('.gw-vw--value input[name*="FirstName"][type="text"]');}
    lastName():Locator {return this.page.locator('input[name*="LastName"][type="text"]');}
    country():Locator {return this.page.locator('select[name*="Country"]');}
    city():Locator {return this.page.locator('input[name*="City"][type="text"]');}
    postalCode():Locator {return this.page.locator('input[name*="PostalCode"][type="text"]');}
    searchButton():Locator {return this.page.locator('#NewAccount-NewAccountScreen-NewAccountSearchDV-SearchAndResetInputSet-SearchLinksInputSet-Search');}
    createAccount():Locator {return this.page.getByText('CNCreate New Account');}
    accountType():Locator {return this.page.getByText('PePerson');}
    addressLine1():Locator {return this.page.locator('input[name="CreateAccount-CreateAccountScreen-CreateAccountDV-AddressInputSet-globalAddressContainer-GlobalAddressInputSet-AddressLine1"]');}
    addressType():Locator {return this.page.locator('select[name="CreateAccount-CreateAccountScreen-CreateAccountDV-AddressType"]');}
    organization():Locator {return this.page.locator('input[name="OrganizationSearchPopup-OrganizationSearchPopupScreen-OrganizationSearchDV-GlobalContactNameInputSet-Name"]');}
    orgSearch():Locator {return this.page.locator('#CreateAccount-CreateAccountScreen-CreateAccountDV-ProducerSelectionInputSet-Producer-SelectOrganization');}
    updateButton():Locator {return this.page.getByText('Update');}
    producerCode(): Locator {return this.page.locator('select[name="CreateAccount-CreateAccountScreen-CreateAccountDV-ProducerSelectionInputSet-ProducerCode"]');}
    orgNameSearch() : Locator {return this.page.locator('#OrganizationSearchPopup-OrganizationSearchPopupScreen-OrganizationSearchDV-SearchAndResetInputSet-SearchLinksInputSet-Search');}
    orgSelect() : Locator {return this.page.getByText('Select');}
    accountHolderPostCreation() : Locator {return this.page.locator('#AccountFile_Summary-AccountSummaryDashboard-AccountDetailsDetailViewTile-AccountDetailsDetailViewTile_DV-AccountHolder_button')}
    detailsTitle(): Locator {return this.page.locator('div[aria-label="Details"] span[class="gw-TitleText"]')}
    accountHolder(): Locator {return this.page.locator('div[id*="AccountHolder_Input"] div[data-gw-getset="text"]')}
    createdAccountName() : Locator {return this.page.locator('#NewAccount-NewAccountScreen-NewAccountSearchResultsLV-0-Name div .gw-value-readonly-wrapper')}
    
    async selectDropdown(value: string) {
        await this.dropdown().getByLabel(value).click();
    }

}
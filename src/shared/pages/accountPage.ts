import { Locator, Page } from "@playwright/test";

export class AccountPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    account(): Locator{return this.page.locator('div[id="TabBar-AccountTab"]');}
    accountSubMenu(): Locator{return this.page.locator('div[id="TabBar-AccountTab"] div[data-gw-click="toggleSubMenu"]')}
    dropdown(): Locator{return this.page.locator('div[class*="gw-subMenu gw-open"] div[class*="gw-action--inner"]');}
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

    homePhone():Locator{return this.page.locator('input[name*="HomePhone"]');}
    workPhone(): Locator{return this.page.locator('input[name*="CreateAccountContactInputSet-Phone-GlobalPhoneInputSet"]');}
    mobilePhone():Locator{return this.page.locator('input[name*="CellPhone"]');}
    primaryPhone(): Locator{return this.page.locator('select[name*="PrimaryPhone"]')}
    primaryEmail(): Locator{return this.page.locator('input[name*="EmailAddress1"]')}
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
    accountHolder(): Locator {return this.page.locator('div[id*="AccountHolder_Input"] div[class*="gw-ActionValueWidget"]')}
    createdAccountName() : Locator {return this.page.locator('#NewAccount-NewAccountScreen-NewAccountSearchResultsLV-0-Name div .gw-value-readonly-wrapper')}
    
    async selectDropdown(value: string) {
        await this.dropdown().getByText(value).click();
    }

}
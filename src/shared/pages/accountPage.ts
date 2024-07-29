import { Locator, Page } from "@playwright/test";

export class AccountPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    account(): Locator{return this.page.locator('div[id="TabBar-AccountTab"]');}
    accountSubMenu(): Locator{
        return this.page.locator('div[id="TabBar-AccountTab"] div[data-gw-click="toggleSubMenu"]')
    }
    accountSearch() : Locator {
        return this.page.locator('input[name*="AccountTab_AccountNumberSearchItem"]');
    }
    errorMessage(): Locator{return this.page.locator('div[class*="gw-MessagesWidget--group-error"] div[class="gw-message"]');}
    missingFieldErrorMessage(): Locator{return this.page.locator('div .gw-message');}
    messagesWidget(): Locator{return this.page.locator('div[class*="gw-MessagesWidget--subGroup-header"]')}
    dropdown(): Locator{return this.page.locator('div[class*="gw-subMenu gw-open"] div[class*="gw-action--inner"]');}
    

    company(): Locator{return this.page.locator('div[id*="GlobalContactNameInputSet"] input');}
    firstName():Locator {return this.page.locator('.gw-vw--value input[name*="FirstName"][type="text"]');}
    lastName():Locator {return this.page.locator('input[name*="LastName"][type="text"]');}
    country():Locator {return this.page.locator('select[name*="GlobalAddressInputSet-Country"]');}
    city():Locator {return this.page.locator('input[name*="City"][type="text"]');}
    state(): Locator {return this.page.locator('select[name*="State"]')}
    postalCode():Locator {return this.page.locator('input[name*="PostalCode"][type="text"]');}
    searchButton():Locator {return this.page.getByRole('button', { name: 'Search' });}
    searchResults(): Locator {
        return this.page.locator('div[id*="NewAccountSearchResultsLV"][role="group"]')
    }
    searchResultAccNum(): Locator {
        return this.page.locator('div[role="button"][id*="AccountNumber_button"]')
    }
    createAccount():Locator {return this.page.getByRole('button', { name: 'Create New Account' });}
    createAccountOptionMenu():Locator {return this.page.getByRole('button', { name: 'Create New Account' });}
    homePhone():Locator{return this.page.locator('input[name*="HomePhone"]');}
    workPhone(): Locator{return this.page.locator('input[name*="CreateAccountContactInputSet-Phone-GlobalPhoneInputSet"]');}
    mobilePhone():Locator{return this.page.locator('input[name*="CellPhone"]');}
    primaryPhone(): Locator{return this.page.locator('select[name*="PrimaryPhone"]')}
    primaryEmail(): Locator{return this.page.locator('input[name*="EmailAddress1"]')}
    addressLine1():Locator {return this.page.locator('input[name*="AddressLine1"]');}
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
    accountNumber(): Locator {return this.page.locator('div[id*="AccountNumber"][class*="gw-TextValueWidget"]')}

    officePhone() : Locator {return this.page.locator('input[name*="CreateAccountContactInputSet-Phone"]')}
    serviceTier() : Locator {return this.page.locator('select[name*="ServiceTier"]');}
    orgType() : Locator {return this.page.locator('select[name*="OrgType"]')}

    async createNewAccount(data: any) : Promise<string> {
        await this.accountSubMenu().click();
        await this.dropdown().getByText("New Account").click();
    
        await this.page.waitForLoadState('networkidle');
        await this.company().fill(data.CompanyName);
        
        await this.searchButton().click()
        await this.page.waitForResponse(response =>
            response.url() === 'http://localhost:8180/pc/PolicyCenter.do' && response.status() === 200
                && response.request().resourceType() === 'fetch'
        );
       
        if(await this.searchResults().isVisible()) {
            return await this.searchResultAccNum().first().innerText();
        }
        await this.createAccount().scrollIntoViewIfNeeded();
        await this.createAccount().click();
        await this.dropdown().getByText(data.account).click();
        
        await this.officePhone().fill(data.officePhone);
        await this.primaryEmail().fill(data.primaryEmail);
        
        await this.page.waitForLoadState('load');
        const apiResPromise = this.page.waitForResponse(response =>
            response.url() === 'http://localhost:8180/pc/PolicyCenter.do' && response.status() === 200
                && response.request().resourceType() === 'fetch'
        );
        await this.country().selectOption(data.country)
        await apiResPromise;
        
        await this.addressLine1().fill(data.address1);
        await this.city().fill(data.city);
        if(data.CompanyName.includes('US')){
            await this.state().selectOption(data.state)
        }
        await this.postalCode().fill(data.postalCode)
    
        await this.addressType().selectOption(data.addressType);
        await this.orgType().selectOption(data.orgType);
            
        await this.orgSearch().click();
        await this.page.waitForLoadState('networkidle')
        await this.organization().fill(data.organization);
        await this.orgNameSearch().click()
        await this.orgSelect().click()
        await this.page.waitForLoadState('networkidle')
        await this.producerCode().selectOption(data.producerCode)

        await this.updateButton().click()
        await this.page.waitForLoadState('networkidle')

        await this.accountHolder().waitFor({state:'visible'});
        return await this.accountNumber().innerText();
    }
}
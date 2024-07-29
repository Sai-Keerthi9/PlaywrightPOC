import { Locator, Page } from "@playwright/test";
import { PageUtils } from "../utils/pageUtils";
import { AccountPage } from "./accountPage";
import { HomePage } from "./home";

export class SubmissionPage {
    readonly page : Page;
    readonly selectButton: string;

    constructor(page: Page) {
        this.page = page;
        this.selectButton = 'td[id*="Select"] div[role="button"]';
    }

    visualisedProductsTab(): Locator {return this.page.locator('div[aria-label="Visualized Products"]')}
    tableRows(): Locator{return this.page.locator('table tbody tr')}
    productNames(): Locator{return this.page.locator('td[id*="Name_Cell"] div[class="gw-value-readonly-wrapper"]')}
    selectProduct(value: string): Locator {
        let selectButton: Locator =  this.tableRows().filter({ has: this.productNames().getByText(value)}).locator(this.selectButton);
        return selectButton;
    }
    nextButton(): Locator{return this.page.locator('div[class*="ToolbarButtonWidget"]').getByText('Next')}
    quoteButton(): Locator{return this.page.locator('div[class*="ToolbarButtonWidget"]').getByText('Quote')}
    bindOptions(): Locator{return this.page.locator('div[class*="ToolbarButtonWidget"]').getByText('Bind Options')}
    submissionId(): Locator{return this.page.locator('div[class="gw-Wizard--Title"]')}
    submStatus(): Locator{return this.page.locator('div[class="gw-Wizard--SubTitle"]')}

    async createSubmission(accountNumber: string): Promise<string> {
        const homePage = new HomePage(this.page);
        const accountPage = new AccountPage(this.page);
        const pageUtils = new PageUtils(this.page);
        let submissionId = '';

        await homePage.account().locator(homePage.expandButton).click();
        await accountPage.accountSearch().fill(accountNumber);
        await accountPage.accountSearch().press('Enter');

        await homePage.actions().click();
        await pageUtils.selectDropdown('New Submission');

        await this.visualisedProductsTab().click();
        await this.selectProduct('Directors and Officers Liability').click();

        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Policy Info' }).waitFor({state:'visible'})
        await this.nextButton().click();//Policy Info'

        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Risk Details' }).waitFor({state:'visible'})
        await  this.nextButton().click() //Risk Details
        
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Pricing' }).waitFor({state:'visible'})
        await  this.nextButton().click() //Pricing
       
        submissionId = (await this.submissionId().innerText()).split(' ')[1];
        return submissionId;
    }

    async quoteSubmission() {
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Risk Analysis' }).waitFor({state:'visible'})
        await this.nextButton().click();//Risk Analysis

        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Policy Review' }).waitFor({state:'visible'})
        await this.quoteButton().click();//Policy Review
    }

    async issuePolicy() {
        const homePage = new HomePage(this.page);
        const pageUtils = new PageUtils(this.page);

        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Quote' }).waitFor({state:'visible'})
        await this.nextButton().click();//Quote

        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Forms' }).waitFor({state:'visible'})
        await this.nextButton().click();//Forms

        await this.page.waitForLoadState('networkidle');
        await homePage.pageTitle().getByText('Payment').waitFor({state:'visible'})
        await this.bindOptions().click();//Payment

        await this.page.on('dialog', async dialog=>dialog.accept())
        await pageUtils.selectDropdown('Issue Policy');

    }
}
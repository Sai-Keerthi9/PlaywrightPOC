import { Locator, Page } from "@playwright/test";

export class submissionPage {
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
}
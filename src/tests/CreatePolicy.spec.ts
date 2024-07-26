import { expect, test } from '../shared/fixtures/base.ts';

test.describe('Create Policy', ()=> {
    test.only('Create D&O Policy', async ({ loginPage, homePage, pageUtils, submissionPage, page }) => {
        
        await page.goto('/pc/PolicyCenter.do');
        await homePage.account().locator(homePage.expandButton).click();
        await pageUtils.selectDropdown('3180308289 Fashion Foundry');
   
        await homePage.actions().click();
        await pageUtils.selectDropdown('New Submission');

        await submissionPage.visualisedProductsTab().click();
        await submissionPage.selectProduct('Directors and Officers Liability').click();

        await page.waitForLoadState('networkidle');
        await page.getByRole('heading', { name: 'Policy Info' }).waitFor({state:'visible'})
        await submissionPage.nextButton().click();//Policy Info'

        await page.waitForLoadState('networkidle');
        await page.getByRole('heading', { name: 'Risk Details' }).waitFor({state:'visible'})
        await  submissionPage.nextButton().click() //Risk Details
        
        await page.waitForLoadState('networkidle');
        await page.getByRole('heading', { name: 'Pricing' }).waitFor({state:'visible'})
        await  submissionPage.nextButton().click() //Pricing
       
        await page.waitForLoadState('networkidle');
        await page.getByRole('heading', { name: 'Risk Analysis' }).waitFor({state:'visible'})
        await submissionPage.nextButton().click();//Risk Analysis

        await page.waitForLoadState('networkidle');
        await page.getByRole('heading', { name: 'Policy Review' }).waitFor({state:'visible'})
        await submissionPage.quoteButton().click();//Policy Review

        await page.waitForLoadState('networkidle');
        await page.getByRole('heading', { name: 'Quote' }).waitFor({state:'visible'})
        await submissionPage.nextButton().click();//Quote

        await page.waitForLoadState('networkidle');
        await page.getByRole('heading', { name: 'Forms' }).waitFor({state:'visible'})
        await submissionPage.nextButton().click();//Forms

        await page.waitForLoadState('networkidle');
        await homePage.pageTitle().getByText('Payment').waitFor({state:'visible'})
        await submissionPage.bindOptions().click();//Payment

        await page.on('dialog', async dialog=>dialog.accept())
        await pageUtils.selectDropdown('Issue Policy');

        await expect( homePage.pageTitle()).toHaveText('Submission Bound');

    })
})
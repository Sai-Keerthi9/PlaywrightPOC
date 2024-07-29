import { Page, request, Browser } from "@playwright/test";
import { test, expect } from '@playwright/test';
import loginData from '../shared/data/loginData.json';
import {LoginPage} from '../shared/pages/loginPage';

let context;
const requestPaylode = {"Login-LoginScreen-LoginDV-username": loginData.userName, "Login-LoginScreen-LoginDV-password": loginData.password}

test.describe.only('Api Testing', ()=>{
    test.beforeAll(async({browser})=>{

        const newContext = await browser.newContext()
        const page = await newContext.newPage()

        const loginPage = new LoginPage(page);

        await page.goto('/pc/PolicyCenter.do')
        await loginPage.username().fill(loginData.userName);
        await loginPage.password().fill(loginData.password);
        await loginPage.loginButton().click();

        await page.waitForLoadState("networkidle")
        await newContext.storageState({path: 'state.json'})

        context = await browser.newContext({storageState: 'state.json'})
    })


    test("Api Login", async ({page})=>{

        const apiContext = await request.newContext();
        const loginResponse =  await apiContext.post("http://localhost:8180/pc/PolicyCenter.do", {data : requestPaylode})

        expect(loginResponse.ok()).toBeTruthy()

    })


    test('with StorageState', async ()=>{
        
        const page = await context.newPage()
        await page.goto('http://localhost:8180/pc/PolicyCenter.do')
        await page.pause()
       
    })

    test('without StorageState', async ({page})=>{
        
        await page.goto('http://localhost:8180/pc/PolicyCenter.do')
        await page.pause()
       
    })

})
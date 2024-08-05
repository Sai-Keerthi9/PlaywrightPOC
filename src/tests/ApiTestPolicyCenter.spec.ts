import { expect, test } from '../shared/fixtures/base.ts';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('API Testing of Policy Center', ()=> {
    test('Retreive All Accounts API', async ({ integrationGateway }) => {
        const response = await integrationGateway.getAccountsAllDetails();
        const resJson = await response.json();

        await integrationGateway.saveToFile('getAccountsAllDetails.json', resJson);
        expect(resJson.count).toBe(25);
        expect(response.status()).toBe(200);
    })
    test('Retreive Account with Account Number API', async ({ integrationGateway }) => {
        const response = await integrationGateway.getAccountfromAcctNumber('C000212105');
        const resJson:any = await response.json();
        
        await integrationGateway.saveToFile('getAccountfromAcctNumber.json', resJson);
        expect(await resJson.data[0].attributes.accountHolder.displayName).toBe('Wright Construction');
        expect(response.status()).toBe(200);
    })
    test('Create Account', async ({ integrationGateway }) => {
        const response = await integrationGateway.createAccountAPi('Fancy Feathers');
        const resJson:any = await response.json();
        
        await integrationGateway.saveToFile('createAccount.json', resJson);

        expect(response.status()).toBe(200);
    })
})
let integrationGateway: string = 'http://localhost:8081';
let policyCenter: string = 'http://localhost:8180/pc/resources'

export const urls:{[Key:string]:string} = {
    createAccount: `${integrationGateway}/api/process`,
    getAccountsAllDeatils: `${integrationGateway}/api/getAccountAllDetails`,
    getAccountfromAcctNumber: `${integrationGateway}/api/getAccountfromAcctNumber`
}

export const dirPath: {[Key:string]:string} = {
    requestDir: 'src/shared/data/requests',
    responseDir: 'src/shared/data/responses'
}

export const headers: {[Key:string]:string} = {
    "accept": "application/json"
}
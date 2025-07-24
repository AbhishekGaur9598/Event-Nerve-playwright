import {test as baseTest} from './common-fixture';

type HooksFixtureType = {
    gotoUrl: any;
 
}

export const test = baseTest.extend<HooksFixtureType>({
    gotoUrl: async({loginPage}, use)=>{
        await loginPage.gotoEventNerve();
        await use();
    },
   
})

export {expect} from '@playwright/test';
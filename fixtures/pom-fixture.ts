import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PimPage } from '../pages/PimPage';


type PomFixturesType = {
    loginPage: LoginPage;
    dashboardPage : DashboardPage;
    pimPage: PimPage;
}

export const test = baseTest.extend<PomFixturesType>({
    loginPage: async({page},use) =>{
        await use(new LoginPage(page));
    },
    dashboardPage : async({page}, use)=>{
        await use(new DashboardPage(page));
    },
   
    pimPage: async({page}, use)=>{
        await use(new PimPage(page))
    }

})


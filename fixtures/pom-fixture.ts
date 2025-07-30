import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PimPage } from '../pages/PimPage';
import { EventPage } from '../pages/EventPage';
import { AddEvent } from '../pages/AddEvent';


type PomFixturesType = {
    loginPage: LoginPage;
      eventPage: EventPage;
    dashboardPage : DashboardPage;
    pimPage: PimPage;
    eventpage: EventPage;
    addEvent: AddEvent;
}

export const test = baseTest.extend<PomFixturesType>({
    loginPage: async({page},use) =>{
        await use(new LoginPage(page));
    },
    dashboardPage : async({page}, use)=>{
        await use(new DashboardPage(page));
    },
   eventPage: async ({ page }, use) => {
    await use(new EventPage(page));
  },

//  addEvent: async({page}, use)=>{
//         await use(new PimPage(page))
//     }

    addEvent: async({page}, use)=>{
        await use(new AddEvent(page))
    }

})
export const expect = test.expect;


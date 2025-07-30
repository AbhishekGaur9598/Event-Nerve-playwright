import { test, expect } from '../../fixtures/hooks-fixture.ts';
import { generateRandomData } from '../../utils/team-member-generator.ts';
import loginModuleData from '../../data/ui-data/login-module-data.json';
import * as fs from 'fs';


// // Load Event Admin Name from team-member-data.json
const teamData = JSON.parse(fs.readFileSync('data/ui-data/team-member-data.json', 'utf-8'));
const eventAdminName = teamData.name;

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
})

test('[TeamMember] Add Team Member', 
    {
        tag: ['@UI', '@stage'],
    }, 
    async ({ gotoUrl,loginPage, eventPage,page,addEvent}) => 
    {
    // Login first
    await loginPage.gotoEventNerve();
    await loginPage.loginEventNerve(process.env.USER_NAME!, process.env.PASSWORD!);
    
    //click Event link
    await page.locator("//div[@class='pageMainSidebar']//a[@title='Events']").click();
    // Check a key element Add Event page tittle display or not
    await expect(page.locator("//span[@class='mail-title tablesSectionTitle']")).toBeVisible();
    //click on Add Event Button
    await page.locator("//span[normalize-space()='Add Event']").click();

     // Assert modal is visible
     await expect(page.locator("//h4[normalize-space()='Add New Event']")).toBeVisible();
     
   // Fill in Event Details
   await page.fill('input[placeholder="Enter event name"]', 'Playwright Test Event');

  // Select Event Admin
   await addEvent.selectEventAdmin(eventAdminName);

   await page.pause();

    });
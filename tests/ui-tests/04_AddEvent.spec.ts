import { test, expect } from '../../fixtures/hooks-fixture.ts';
import * as fs from 'fs';
import loginModuleData from '../../data/ui-data/login-module-data.json';
import { EventUtils } from '../../utils/AddEventUtils.ts';

// Load data files
const teamData = JSON.parse(fs.readFileSync('data/ui-data/team-member-data.json', 'utf-8'));

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test('[TeamMember] Add Team Member', 
  // { tag: ['@UI', '@stage'] }, 
  
  async ({ gotoUrl, loginPage, eventPage, page, addEvent }) => {
  // Login
  await loginPage.gotoEventNerve();
  await loginPage.loginEventNerve(process.env.USER_NAME!, process.env.PASSWORD!);
  // Navigate to Events
 addEvent.clickEventLink();
  // Click Add Event
 addEvent.NavigateAddEventPage();
// Fill Event Name
   const eventName = EventUtils.generateUniqueEventName();
   EventUtils.saveEventName(eventName);
   await page.fill('input[placeholder="Enter event name"]', eventName); 
// Select Event Admin
await addEvent.selectEventAdmin(teamData.name);

//set startdate and start Time
await addEvent.fillStartDateAndStartTime();
//set Enddate and End Time
await addEvent.fillEndDateAndEndTime();
//click save Button
await addEvent.clickSaveBtn();
// verify Successmsg
await addEvent.successMessage();

const searchInput = page.locator('input[placeholder="Search Events"]');
await searchInput.clear(); // clear old input
await searchInput.type(eventName, { delay: 20 }); // simulate real typing

await page.waitForTimeout(300); // wait for debounce/render

const searchResult = page.locator('table tr', { hasText: eventName });
await expect(searchResult).toBeVisible({ timeout: 300 });

console.log(`✅ Event "${eventName}" found in search results.`);

// await page.waitForLoadState('networkidle');

// await page.pause();

});

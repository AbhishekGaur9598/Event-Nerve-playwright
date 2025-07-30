import { Page, Locator, expect } from "@playwright/test";
import * as fs from 'fs';
import teamMember from '../data/ui-data/team-member-data.json';

export class AddEvent {
  readonly page: Page;
  readonly eventNameInput: Locator;
  readonly eventAdminDropdown: Locator;
  readonly startDateInput: Locator;
  readonly startTimeInput: Locator;
  readonly endDateInput: Locator;
  readonly endTimeInput: Locator;
  readonly addEventButton: Locator;
  readonly saveButton: Locator;
  readonly modalTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eventNameInput = page.locator('input[placeholder="Enter event name"]');
    this.eventAdminDropdown = page.locator("(//select[@name='admin'])[1]");
    this.startDateInput = page.locator("//input[@ng-model='eventSelectedStartDate']");
    this.startTimeInput = page.locator("//input[@ng-model='eventSelectedStartTime']");
    this.endDateInput= page.locator("//input[@ng-model='eventSelectedEndDate']");
    this.endTimeInput = page.locator("//input[@name='endTime']");
    this.saveButton = page.locator("//button[@type='submit']");

  }

  async clickEventLink() 
  {
    // Navigate to Events
  await this.page.locator("//div[@class='pageMainSidebar']//a[@title='Events']").click();
  await expect(this.page.locator("//span[@class='mail-title tablesSectionTitle']")).toBeVisible();

  }

  async NavigateAddEventPage()
  {
    // Click Add Event
  await this.page.locator("//span[normalize-space()='Add Event']").click();
  await expect(this.page.locator("//h4[normalize-space()='Add New Event']")).toBeVisible();
  }


async selectEventAdmin(eventAdminName: string) {
  await expect(this.eventAdminDropdown).toBeVisible();

  const options = await this.eventAdminDropdown.locator('option').all();

  for (const option of options) {
    const text = (await option.textContent())?.trim().toLowerCase();
    if (text === eventAdminName.trim().toLowerCase()) {
      const value = await option.getAttribute('value');
      if (value) {
        await this.eventAdminDropdown.selectOption(value);
        console.log(`✅ Selected Event Admin: ${eventAdminName}`);
        return;
      }
    }
  }

  throw new Error(`❌ Team member not found in dropdown: ${eventAdminName}`);
}


  async fillStartDateAndStartTime() {
  const currentDate = new Date();

  const formattedDate = currentDate.toISOString().split('T')[0]; // yyyy-mm-dd
  const formattedTime = currentDate.toTimeString().split(' ')[0].substring(0, 5); // HH:mm

  await this.startDateInput.evaluate((el, value) => {
    (el as HTMLInputElement).value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, formattedDate);

  await this.startTimeInput.evaluate((el, value) => {
    (el as HTMLInputElement).value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, formattedTime);
}


async fillEndDateAndEndTime() {
  const currentDate = new Date();
  // Add 20 days
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 20);
  const formattedEndDate = endDate.toISOString().split('T')[0]; // yyyy-mm-dd
  const formattedEndTime = currentDate.toTimeString().split(' ')[0].substring(0, 5); // HH:mm

  // Fill End Date
  await this.endDateInput.evaluate((el, value) => {
    (el as HTMLInputElement).value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, formattedEndDate);

  // Fill End Time
  await this.endTimeInput.evaluate((el, value) => {
    (el as HTMLInputElement).value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, formattedEndTime);
}





  async clickSaveBtn() 
  {
    await this.saveButton.click();
  }

 async successMessage() 
  {
    const successMsg = this.page.locator("(//div[@class='ng-binding ng-scope'])[2]");
    await successMsg.waitFor({ state: 'visible' });
    console.log("✅ Success Message:", (await successMsg.textContent())?.trim());
  }

}

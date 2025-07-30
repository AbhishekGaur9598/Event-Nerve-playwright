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
    this.startDateInput = page.locator('input[placeholder="dd/mm/yyyy"]').nth(0);
    this.startTimeInput = page.locator('input[placeholder="--:-- --"]').nth(0);
    this.endDateInput = page.locator('input[placeholder="dd/mm/yyyy"]').nth(1);
    this.endTimeInput = page.locator('input[placeholder="--:-- --"]').nth(1);
    this.addEventButton = page.locator('span:has-text("Add Event")');
    this.saveButton = page.locator('button:has-text("Save")');
    this.modalTitle = page.locator('h4:has-text("Add New Event")');
  }

  async openAddEventModal() {
    await this.addEventButton.click();
    await expect(this.modalTitle).toBeVisible();
  }

//   async fillEventDetails(eventName: string, eventAdminName: string) {
//     await this.eventNameInput.fill(eventName);
//     await this.selectEventAdmin(eventAdminName);
//     await this.startDateInput.fill('28/07/2025');
//     await this.startTimeInput.fill('10:00 AM');
//     await this.endDateInput.fill('28/07/2025');
//     await this.endTimeInput.fill('12:00 PM');
//   }


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




  async submitForm() {
    await this.saveButton.click();
  }

  static loadEventAdminNameFromJson(filePath: string): string 
  {
    const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return json.name;
  }
}

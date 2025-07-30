import { Page, Locator, expect } from "@playwright/test";
import teamMember from "../data/ui-data/team-member-data.json";

export class AddEvent {
  readonly page: Page;
  readonly eventNameInput: Locator;
  readonly eventAdminDropdown: Locator;
  readonly startDateInput: Locator;
  readonly startTimeInput: Locator;
  readonly endDateInput: Locator;
  readonly endTimeInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eventNameInput = page.locator('input[placeholder="Enter event name"]');
    this.eventAdminDropdown = page.locator("(//select[@name='admin'])[1]");
    this.startDateInput = page.locator("//input[@ng-model='eventSelectedStartDate']");
    this.startTimeInput = page.locator("//input[@ng-model='eventSelectedStartTime']");
    this.endDateInput = page.locator("//input[@ng-model='eventSelectedEndDate']");
    this.endTimeInput = page.locator("//input[@name='endTime']");
    this.saveButton = page.locator("//button[@type='submit']");
  }

  async clickEventLink() {
    const eventLink = this.page.locator("//div[@class='pageMainSidebar']//a[@title='Events']");
    await expect(eventLink).toBeVisible({ timeout: 10000 });

    await Promise.all([
      this.page.waitForLoadState("networkidle"),
      eventLink.click(),
    ]);

    await expect(this.page.locator("//span[@class='mail-title tablesSectionTitle']"))
      .toBeVisible({ timeout: 10000 });
  }

  async navigateToAddEventPage() {
    const addEventBtn = this.page.locator("//span[normalize-space()='Add Event']");
    await expect(addEventBtn).toBeVisible({ timeout: 10000 });
    await addEventBtn.click();

    await expect(this.page.locator("//h4[normalize-space()='Add New Event']"))
      .toBeVisible({ timeout: 10000 });
  }

  async selectEventAdmin(eventAdminName: string) {
    await expect(this.eventAdminDropdown).toBeVisible({ timeout: 10000 });

    const options = await this.eventAdminDropdown.locator("option").all();

    for (const option of options) {
      const text = (await option.textContent())?.trim().toLowerCase();
      if (text === eventAdminName.trim().toLowerCase()) {
        const value = await option.getAttribute("value");
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
    const formattedDate = currentDate.toISOString().split("T")[0]; // yyyy-mm-dd
    const formattedTime = currentDate.toTimeString().split(" ")[0].substring(0, 5); // HH:mm

    await this.setDateTimeField(this.startDateInput, formattedDate);
    await this.setDateTimeField(this.startTimeInput, formattedTime);
  }

  async fillEndDateAndEndTime() {
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 20);

    const formattedEndDate = endDate.toISOString().split("T")[0];
    const formattedEndTime = currentDate.toTimeString().split(" ")[0].substring(0, 5);

    await this.setDateTimeField(this.endDateInput, formattedEndDate);
    await this.setDateTimeField(this.endTimeInput, formattedEndTime);
  }

  private async setDateTimeField(field: Locator, value: string) {
    await field.evaluate((el, val) => {
      (el as HTMLInputElement).value = val;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }, value);
  }

  async clickSaveBtn() {
    await expect(this.saveButton).toBeVisible({ timeout: 10000 });
    await this.saveButton.click();
  }

  async successMessage() {
    const successMsg = this.page.locator("(//div[@class='ng-binding ng-scope'])[2]");
    await expect(successMsg).toBeVisible({ timeout: 10000 });

    const message = await successMsg.textContent();
    console.log("✅ Success Message:", message?.trim());
  }
}

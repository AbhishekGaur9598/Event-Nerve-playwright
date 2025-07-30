import { Page, Locator } from "@playwright/test";


export class EventPage {
    readonly page: Page;
    readonly eventNameInput: Locator;
    readonly addEventButton: Locator;
    readonly createTeamMemberBtn: Locator;
    readonly selectTeamMemberType: Locator;
    readonly selectEventName: Locator; s
    readonly nameInput: Locator;
    readonly mobileInput: Locator;
    readonly emailInput: Locator;
    readonly userIdInput: Locator;
    readonly Password: Locator;
    readonly AddteamMemberSubmitBtn: Locator;
    readonly successNotification: Locator;


    constructor(page: Page) {
        this.page = page;
        this.addEventButton = page.locator("//a[@ng-click='switchSidebarMode()']//span[contains(text(),'Event Team')]");
        this.createTeamMemberBtn=page.locator("//span[normalize-space()='Create team member']");
        this.selectTeamMemberType=page.locator("//select[@id='userType']");
        this.selectEventName=page.locator("//select[@name='eventName']");
        this.eventNameInput = page.locator("//input[@id='name']");
        this.mobileInput = page.locator("//input[@id='mobile']");
        this.emailInput = page.locator("//input[@id='email']");
        this.userIdInput = page.locator("//input[@id='userId']");
        this.Password = page.locator("//input[@id='Password']");
        this.AddteamMemberSubmitBtn = page.locator("//button[normalize-space()='Add team member']");
        this.successNotification = page.locator("(//div[@class='ng-binding ng-scope'])[2]");

       
    }

    async clickAddNewEvent() 
    {
        await this.addEventButton.click();
        await this.createTeamMemberBtn.click();
    }

//    async selectMemberType(value: string) 
//   {
//     await this.selectTeamMemberType.selectOption({ value });
//   }

async selectMemberType(value: string) {
    await this.selectTeamMemberType.waitFor({ state: 'visible' });
    await this.selectTeamMemberType.selectOption({ value });
}


  async selectEventNames(value: string)
  {
    await this.selectEventName.selectOption({ value });
  }

    async fillTeamMemberDetails(data: 
    {
        name: string,
        mobile: string,
        email: string,
        userId: string,
        role: string
    }) 
    {
        await this.eventNameInput.fill(data.name);
        await this.mobileInput.fill(data.mobile);
        await this.emailInput.fill(data.email);
        await this.userIdInput.fill(data.userId);
        await this.Password.fill("Gaur@123");
        
    }
    async submitEvent() 
    {
        await this.AddteamMemberSubmitBtn.click(); 
    }

    async getSuccessMessage(): Promise<string> 
    {
    await this.successNotification.waitFor({ state: 'visible' });
    return await this.successNotification.textContent() || '';
   }

}

import { Locator, Page } from "@playwright/test";

export class LoginPage{
    readonly page:Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly invelidCredentialsErrorPopup: Locator;

    constructor(page: Page){
        this.page = page;
        this.userNameInput = page.locator("//input[@placeholder='Enter your Email ID']");
        this.passwordInput = page.locator("//input[@placeholder='Password']");
        this.loginButton = page.locator("//input[@value='Login']");
        this.invelidCredentialsErrorPopup = page.locator("(//div[@class='ng-binding ng-scope'])[2]");
    }
    
    /**
     * To open URL into browser
     */
    async gotoEventNerve()
    {
        await this.page.goto(`${process.env.BASE_URL}/#!/login-form`);
    }

    /**
     * To Login into OrangeHRM Application
     * @param userName 
     * @param password 
     */
    async loginEventNerve(userName: string, password: string){
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
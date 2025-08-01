import { test, expect } from '../../fixtures/hooks-fixture';
import loginModuleData from '../../data/ui-data/login-module-data.json';

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
})

test('[Login] Verify that the user cannot log in with an invalid password.', 
    // {
    // tag: ['@UI', '@stage'],
    // }, 
    async ({ gotoUrl, loginPage, commonUtils }) => {
    const username = process.env.USER_NAME!;
    await loginPage.loginEventNerve(username, loginModuleData.wrong_password);
    await expect(loginPage.invelidCredentialsErrorPopup).toHaveText("Invalid password !!");
    await expect(loginPage.userNameInput).toBeVisible();
})


    test('[Login] Verify that the user cannot log in with an invalid username.', {
        // tag: ['@UI', '@stage'],
       
    }, async ({ gotoUrl, loginPage, commonUtils }) => {
        const password = process.env.PASSWORD!;
        await loginPage.loginEventNerve(loginModuleData.wrong_username, password);
        await expect(loginPage.invelidCredentialsErrorPopup).toHaveText(loginModuleData.invelid_credentials_text);
        await expect(loginPage.userNameInput).toBeVisible();
    })



    test('[Login] Verify that the user cannot log in with both an invalid username and password.', 
        // {
        // tag: ['@UI', '@stage'],
        // }, 
        async ({ gotoUrl, loginPage, commonUtils }) => {
        await loginPage.loginEventNerve(loginModuleData.wrong_username, loginModuleData.wrong_password);
        await expect(loginPage.invelidCredentialsErrorPopup).toHaveText(loginModuleData.invelid_credentials_text);
        await expect(loginPage.userNameInput).toBeVisible();
    })




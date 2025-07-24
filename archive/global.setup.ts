// import { test } from '../../fixtures/common-fixture'
import { test, expect } from '../fixtures/hooks-fixture';

// import { expect } from '@playwright/test'

test('Global Setup for Auto Login', async ({ gotoUrl,page, loginPage, dashboardPage, commonUtils }) => {
    const decryptedUserName = commonUtils.decryptData(process.env.USER_NAME!);
    const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!)
  
    await loginPage.loginEventNerve(process.env.USER_NAME!, process.env.PASSWORD!);
    await page.waitForURL(process.env.BASE_URL + '/home-page/dashboard');
    // await expect(dashboardPage.dashboardTitleText).toHaveText('Dashboard');
    await page.context().storageState({
        path: './playwright/.auth/auth.json'
    })
})
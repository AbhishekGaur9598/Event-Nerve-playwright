// tests/ui/create-team-member.spec.ts
import { test, expect } from '../../fixtures/hooks-fixture.ts';
import { generateRandomData } from '../../utils/team-member-generator.ts';
import loginModuleData from '../../data/ui-data/login-module-data.json';

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
})

test('[TeamMember] Create team member with dynamic data and verify creation', 
    {
        tag: ['@UI', '@stage'],
    }, 
    async ({ gotoUrl,loginPage, eventPage,page }) => {

    // Login first
    await loginPage.gotoEventNerve();
    await loginPage.loginEventNerve(process.env.USER_NAME!, process.env.PASSWORD!);
// click clickAddNewEvent link
    await eventPage.clickAddNewEvent();
 // Generate random data
    const randomData = generateRandomData();
// Select role (eventAdmin or something else)
    await eventPage.selectMemberType(randomData.role);

    await eventPage.fillTeamMemberDetails(randomData);
    await eventPage.submitEvent();

    const successMessage = await eventPage.getSuccessMessage();
    console.log('✅ Success Message:', successMessage);
    expect(successMessage).not.toContain('Internal Server Error');

    // await page.waitForLoadState('networkidle');
    // await page.pause();

});



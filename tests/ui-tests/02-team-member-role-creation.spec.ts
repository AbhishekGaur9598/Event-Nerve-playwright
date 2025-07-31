import { test, expect } from '../../fixtures/hooks-fixture';
import { generateRandomData, getRolesConfig } from '../../utils/roleUtils';

test('Create all team roles with role-specific field behavior', async ({ loginPage, eventPage, page }) => 
  {
  await loginPage.gotoEventNerve();
  await loginPage.loginEventNerve(process.env.USER_NAME!, process.env.PASSWORD!);

  const { allRoles, rolesNeedingEvent } = getRolesConfig();

  for (const role of allRoles) 
    {
    const data = generateRandomData(role);
    console.log(`🔁 Creating team member with role: ${role}`);

    await eventPage.clickAddNewEvent();
    await page.locator("//select[@id='userType']").selectOption({ label: role });

    if (rolesNeedingEvent.includes(role)) {
      await page.locator("//select[@name='eventName']").selectOption({ label: 'Annual Event' });
    }

    await page.locator("//input[@id='name']").fill(data.name);
    await page.locator("//input[@id='mobile']").fill(data.mobile);
    await page.locator("//input[@id='email']").fill(data.email);

    if (role.toLowerCase() === 'vendor') 
    {
      const shopNameLocator = page.locator("//input[@id='shopName']");
      await expect(shopNameLocator).toBeVisible({ timeout: 3000 });
      await shopNameLocator.fill(data.shopName);
    }

    await page.locator("//input[@id='userId']").fill(data.userId);
    await page.locator("//input[@id='Password']").fill(data.password);

    await page.locator("//button[normalize-space()='Add team member']").click();

    const toast = page.locator("(//div[@class='ng-binding ng-scope'])[2]");
    await expect(toast).toBeVisible({ timeout: 5000 });
    const message = await toast.textContent();

    console.log(`✅ ${role} created → ${message}`);
    await page.waitForTimeout(1500);
  }
});





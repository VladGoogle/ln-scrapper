import { test, chromium } from '@playwright/test';
import * as dotenv from "dotenv";

import {BasePage, LoginPage, NavbarComponent, NetworkPage} from '../page-objects';

dotenv.config()

let browser;
let context;
let page;

test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('/');
});

test.afterAll(async () => {
  await context.close();
  await browser.close();
});

test('Login to account', async () => {
  const loginPage = new LoginPage(page);
  const basePage = new BasePage(page);

  await basePage.signInButton.click()
  await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
});

test('Open the Network tab', async () => {
  const navbar = new NavbarComponent(page);
  await page.waitForTimeout(3000);
  await navbar.networkTab.click();
});

test('Click on the "Connect" button for all mutual connections', async () => {
  const network = new NetworkPage(page);

  await page.waitForTimeout(4000);

  const buttons = await network.connectButtons.all()

  await network.hideChatButton.click()

  for (const button of buttons) {
    await  button.scrollIntoViewIfNeeded()
    await button.click()
    await page.waitForTimeout(1500);

    if(await network.limitPopup.isVisible()) {
      await network.limitPopupCloseButton.click()
      await page.waitForTimeout(1000);
    }

  }

});

import { chromium } from '@playwright/test';
import * as dotenv from "dotenv";

import { BasePage, LoginPage, NavbarComponent, NetworkPage } from '../page-objects';

dotenv.config();

export const handler = async () => {
  let browser, context, page;

  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process',
        '--no-zygote',
      ],
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('/');

    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);

    await basePage.signInButton.click();
    await loginPage.login(process.env.EMAIL, process.env.PASSWORD);

    const navbar = new NavbarComponent(page);
    await page.waitForTimeout(3000);
    await navbar.networkTab.click();

    const network = new NetworkPage(page);
    await page.waitForTimeout(3000);

    let buttons = await network.connectButtons.all();
    let isClosed = false;

    while (true) {
      for (const button of buttons) {
        await button.scrollIntoViewIfNeeded();
        await button.click();

        if (await network.limitLastPopup.isVisible()) {
          isClosed = true;
          break;
        }

        if (await network.limitWarningPopup.isVisible()) {
          await network.limitPopupCloseButton.click();
        }
      }

      if (isClosed) {
        break;
      }

      await page.mouse.wheel(0, 15000);
      await page.waitForTimeout(3000);
      buttons = await network.connectButtons.all();
    }
  } catch (error) {
    console.error('Error running Playwright tests:', error);
  } finally {
    if (context) await context.close();
    if (browser) await browser.close();
  }
};

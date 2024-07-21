import { type Locator, type Page } from '@playwright/test';

export class NetworkPage {
    readonly page: Page;
    readonly growTab: Locator;
    readonly connectButtons: Locator;
    readonly hideChatButton: Locator;
    readonly limitLastPopup: Locator;
    readonly limitWarningPopup: Locator;
    readonly limitPopupCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.growTab = page.locator('xpath=/html/body/div[5]/div[3]/div/div/div/div/div[2]/div/div/main/div[1]/div/div/button[1]');
        this.connectButtons = page.locator('button[aria-label*="connect"]');
        this.hideChatButton = page.locator('xpath=/html/body/div[4]/div[4]/aside[1]/div[1]/header/div[3]/button[2]')
        this.limitLastPopup = page.getByRole('heading', { name: 'You’ve reached the weekly' })
        this.limitWarningPopup = page.locator('#ip-fuse-limit-alert__header')
        this.limitPopupCloseButton = page.getByLabel('Got it')
    }
}
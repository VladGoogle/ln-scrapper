import { expect, type Locator, type Page } from '@playwright/test';

export class NavbarComponent {
    readonly page: Page;
    readonly networkTab: Locator;
    readonly jobsTab: Locator;
    readonly messageTab: Locator;
    readonly notificationTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.networkTab = page.locator('a[href*="mynetwork"]');
        this.jobsTab = page.locator('a[href*="jobs"]');
        this.messageTab = page.locator('a[href*="messaging"]');
        this.notificationTab = page.locator('a[href*="notifications"]');
    }
}